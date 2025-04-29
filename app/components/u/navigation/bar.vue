<template lang="pug">
nav(v-if='active' class="border-neutral-300 dark:border-neutral-800 fixed w-full top-0 z-50 transition-transform bg-(--ui-bg)/80" :class='[classes, { "-translate-y-full": sticky && !reveal }]')

	div(:class="ui.container")
		div(class="relative flex h-16 items-center justify-between gap-1.5")
			div(class="inset-y-0 left-0 flex items-center lg:hidden")

			//- Mobile menu, show/hide based on menu state
			u-drawer(v-model:open='menu' id='mobile-menu' direction='top' class='lg:hidden !rounded-b-none' no-body-styles)
				template(#header)
					div(class="flex items-center justify-between")
						u-share-button
						u-button(v-bind='ui.button' @click="toggle()" icon="i-heroicons-outline:x" aria-controls="mobile-menu" color="neutral" size='lg' variant="ghost")

				template(#body)
					div(class='flex flex-col gap-8 grow')

						div(v-if='!back' class='flex flex-col gap-4')
							h6(class='text-neutral-700 dark:text-neutral-100 text-bold text-sm') {{ t('navigation.name') }}

							ul(class='flex flex-col gap-1')
								li(v-for='{ icon, text, id, active } in navigation.data')
									u-navigation-link(@click='navigate(id)' :active :icon :text :aria-current='active')

						div(class='flex flex-col gap-4 grow md:hidden')
							h6(class='text-neutral-700 dark:text-neutral-100 text-bold text-sm') {{ t('navigation.settings', 2) }}

							div(class='flex flex-col flex-wrap gap-1 grow w-full place-content-between')
								u-language-select(class='grow')
								u-color-select(show-label class='grow')
								u-theme-toggle(show-label class='grow')

				//- Mobile menu button
				u-button(
					:aria-expanded="menu" 
					:aria-label='t("menu.sr")' 
					:icon='menu ? "i-heroicons-outline:x": "i-heroicons-solid:menu-alt-2"'
					color="neutral" 
					aria-controls="mobile-menu" 
					class="aspect-square hover:bg-neutral-500/10 hover:dark:bg-neutral-400/10"
					variant='ghost' 
					size='lg' 
					)
					//- span(class="absolute -inset-0.5")
					//- span(class="sr-only") {{ t('menu.sr') }}

					//- icon menu
					//- u-icon(class='w-6 h-6' :name='menu ? "i-heroicons-outline:x": "i-heroicons-solid:menu-alt-2"')

			div(class="flex flex-1 items-center sm:items-stretch sm:justify-start")
				div(v-if='!slot.left' class='flex gap-6')
					div(v-if='!back' class="hidden shrink-0 xl:flex")
						lazy-favicon(class="h-8 w-auto")

					div(v-if='!back' class="hidden lg:flex")
						//- u-navigation-menu(:items='navigation.data' color='primary' unmount-on-hide arrow content-orientation="vertical")
						div(class="flex gap-1.5")
							u-tooltip(v-for='{ to, icon, text, id, active, kbds } in navigation.data' :text :kbds :disabled='active')
								u-navigation-link(@click='navigate(id)' :active :icon :text :aria-current='active' :kbds arrow)

					u-navigation-button-back(v-else)

				slot(name='left' :menu)

			div(class="absolute inset-y-0 right-0 items-center gap-1.5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden md:flex")

				div(v-if='!slot.right' class='flex gap-1.5 sm:flex')
					u-share-button
					u-language-select
					u-color-select(square)
					u-theme-toggle(square)

				slot(name='rigth' :menu)

		slot(:menu :reveal :top)
</template>

<script setup lang="ts">
type Props = {
	active?: boolean
	sticky?: boolean
	back?: boolean
}

const slot = useSlots()
const { t } = useI18n()
const hash = useHashRoute()
const { desktop } = useDisplay()

defineProps<Props>()

const navigation = useNavigation()

const menu = defineModel('open', { default: false })
const classes = shallowRef('border-b backdrop-blur')
const top = shallowRef(0)
const reveal = shallowRef(true)

const toggle = () => menu.value = !menu.value
const navigate = (value: string) => {
	hash.value = value
	menu.value = false
	reveal.value = true

	const element = document.querySelector(`#${value}`)
	element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const recolor = () => {
	// Remove opacity on scroll top
	classes.value = window.scrollY === 0
		? 'bg-transparent'
		: 'border-b backdrop-blur'
}

const hide = () => {
	reveal.value = window.scrollY < 500 || top.value > window.scrollY
	top.value = window.scrollY
}


useEventListener('scroll', () => {
	recolor()
	hide()
})

const { current } = useMagicKeys({
	passive: false,
	onEventFired(event) {
		const keys = ['arrowdown', 'arrowup']
		const is = keys?.some(value => current.has(value))

		if (!is || current.size !== 1) return
		event.preventDefault()
		if (current.has('arrowdown')) navigation.next()
		else navigation.prev()
	}
})

const ui = {
	container: 'mx-auto max-w-7xl px-2 sm:px-6 lg:px-8',
	button: {
		class: 'focus:outline-none focus:ring-1 focus:ring-inset focus:ring-neutral-600/50 dark:focus:ring-neutral-300/50',
		variant: 'ghost',
		color: 'neutral'
	}
}

watchThrottled(desktop, value => {
	if (value) menu.value = false
},{ throttle: 100 })

onMounted(recolor)
</script>

<style scoped></style>
