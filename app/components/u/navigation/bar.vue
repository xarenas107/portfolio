<template lang="pug">
nav(v-if='active' class="border-(--ui-border-muted)/50 fixed w-full bottom-0 lg:bottom-auto z-50 transition-transform" :class='[classes, { "-translate-y-full": sticky && !reveal }]')

	//- Scroll progress bar
	u-progress(v-model='scroll.value' :max='scroll.max' :ui="ui.progress" color='neutral' size='2xs' )

	//- Navbar container
	div(:class="ui.container")
		div(class="relative flex h-16 items-center justify-between gap-2")
			div(class="hidden lg:flex flex-1 items-center sm:items-stretch sm:justify-start")
				div(v-if='!slot.left' class='flex gap-6')
					div(v-if='!back' class=" shrink-0 flex")
						lazy-favicon(class="h-8 w-auto")

					div(v-if='!back' class="flex")
						//- u-navigation-menu(:items='navigation.data' color='primary' unmount-on-hide arrow content-orientation="vertical")
						div(class="flex gap-2")
							u-tooltip(v-for='{ icon, text, id, active, kbds } in data' :text :kbds :disabled='active')
								u-navigation-link(v-if='id' @click='navigate(id)' :active :icon :text :aria-current='active' :kbds arrow)

					u-navigation-button-back(v-else)

				slot(name='left' :menu)

			div(class="items-center gap-2 pr-2 sm:ml-6 sm:pr-0 hidden xl:flex")

				div(v-if='!slot.right' class='inset-y-0 left-0 flex items-center gap-2 justify-end w-full')
					u-share-button(square)
					u-language-select
					u-color-select(square)
					u-theme-toggle(square)

				slot(name='rigth' :menu)

			div(class="inset-y-0 left-0 flex items-center gap-2 justify-end xl:hidden w-full")
				u-share-button(square)

				//- Mobile menu, show/hide based on menu state
				u-drawer(v-model:open='menu' id='mobile-menu' direction='bottom' no-body-styles)
					template(#header)
						div(class="flex items-center justify-end")
							u-button(v-bind='ui.button' @click="toggle()" icon="i-heroicons-outline:x" aria-controls="mobile-menu" color="neutral" size='lg' variant="ghost")

					template(#body)
						div(class='flex flex-col gap-8 grow')

							div(v-if='!back' class='flex flex-col gap-4 lg:hidden')
								h6(class='text-muted text-bold text-sm') {{ t('navigation.name') }}

								ul(class='flex flex-col gap-1')
									li(v-for='{ icon, text, id, active } in data')
										u-navigation-link(v-if='id' @click='navigate(id)' :active :icon :text :aria-current='active')

							div(class='flex flex-col gap-4 grow')
								h6(class='text-muted text-bold text-sm') {{ t('navigation.settings', 2) }}

								div(class='flex flex-col flex-wrap gap-1 grow w-full place-content-between')
									u-language-select(class='grow')
									u-color-select(show-label class='grow')
									u-theme-toggle(show-label class='grow')

					//- Mobile menu button
					u-button(
						:aria-expanded="menu"
						:aria-label='t("menu.sr")'
						color="neutral"
						aria-controls="mobile-menu"
						class="aspect-square hover:bg-neutral-500/10 hover:dark:bg-neutral-400/10"
						icon='i-heroicons-solid:menu-alt-2'
						variant='ghost'
						size='lg'
						)
						//- span(class="absolute -inset-0.5")
						//- span(class="sr-only") {{ t('menu.sr') }}

						//- icon menu
						//- u-icon(class='w-6 h-6' :name='menu ? "i-heroicons-outline:x": "i-heroicons-solid:menu-alt-2"')

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
const { xl } = useDisplay()

defineProps<Props>()

const { data, prev, next, go } = useNavigation()

const menu = defineModel('open', { default: false })
const classes = shallowRef('')
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
	const set = new Set<string>(['backdrop-blur', 'bg-(--ui-bg)/80'])

	// Remove opacity on scroll top
	if (window.scrollY === 0) set.add('sm:bg-transparent')
	classes.value = Array.from(set).join(' ')
}

const hide = () => {
	reveal.value = window.scrollY < 500 || top.value > window.scrollY
	top.value = window.scrollY
}

const scroll = reactive({
	value: 0,
	max: 0
})

const progress = () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement
	scroll.max = scrollHeight - clientHeight
	scroll.value = scrollTop
}

useEventListener('scroll', (event) => {
	progress()
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
		if (current.has('arrowdown')) next()
		else prev()
	}
})

const ui = {
	container: 'mx-auto max-w-7xl px-2 sm:px-6 lg:px-8',
	button: {
		class: 'focus:outline-none focus:ring-1 focus:ring-inset focus:ring-neutral-600/50 dark:focus:ring-neutral-300/50',
		variant: 'ghost',
		color: 'neutral'
	},
	progress: {
		root: 'absolute top-0 lg:top-auto lg:bottom-0',
		indicator: 'rounded-none',
		base: 'rounded-none bg-(--ui-border-accented)/50'
	}
}

watchThrottled(xl, (value) => {
	if (value) menu.value = false
}, { throttle: 100 })

onMounted(() => {
	progress()
	recolor()
})
</script>

<style scoped></style>
