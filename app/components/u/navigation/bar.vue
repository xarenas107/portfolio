<template lang="pug">
nav(v-if='active' class="fixed w-full z-50 transition-[transform background] duration-200 ease" :class='[styles.nav, { "pointer-coarse:translate-y-(--position) pointer-coarse:lg:-translate-y-(--position)": sticky }]' ref='nav')

	//- Scroll progress bar
	lazy-u-loader(class='translate-y-full border-default/80 bg-default/80')

	//- Navbar container
	div(:class="ui.container")
		div(class="relative flex h-16 items-center justify-between gap-4")
			div(class="flex flex-1 gap-4 sm:gap-1 items-center sm:items-stretch sm:justify-start")
				div(v-if='!slot.left' class='flex gap-6')
					div(v-if='!back' class=" shrink-0 flex gap-2 place-items-center-safe")
						lazy-favicon(class="h-8 w-auto")

					//- u-download-button(v-if='!back' show-label class='lg:hidden')
					div(v-if='!back' class="lg:flex hidden")
						//- u-navigation-menu(:items='data' label-key="text" color='primary' unmount-on-hide arrow content-orientation="vertical")
						div(class="flex gap-1")
							u-tooltip(v-for='{ icon, text, id, active, kbds, to } in data' :text :kbds :disabled='active')
								u-navigation-link(v-if='id' @click.prevent='navigate(id)' :href='to' :active :icon :text :aria-current='active' :kbds arrow)

					u-navigation-button-back(v-else)

				//- lazy-u-button(v-if='!back' v-bind='props' :href="behance?.href" :label="t('section.portfolio')" class='rounded-lg cursor-pointer size-fit' variant='outline' color='primary' trailing-icon="i-heroicons-outline:external-link" size='lg')

				slot(name='left' :menu)

			div(class="items-center gap-2 pr-2 sm:ml-6 sm:pr-0 hidden xl:flex")

				div(v-if='!slot.right' class='inset-y-0 left-0 flex items-center gap-2 justify-end w-full')
					u-download-button(square)
					u-share-button(square)
					u-language-select
					u-color-select(square)
					u-theme-toggle(square)

				slot(name='rigth' :menu)

			div(class="inset-y-0 left-0 flex items-center gap-2 justify-end xl:hidden w-full")
				u-download-button(square)
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
									li(v-for='{ icon, text, id, active, to } in data')
										u-navigation-link(v-if='id' :href='to' @click.prevent='navigate(id)' :active :icon :text :aria-current='active')

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

		slot(:menu :reveal)

	//- template(#content)
		u-transition(delay='.5s' before-enter-class="opacity-0" duration='.25s')
			template(#default='{ state, ...props }')
	//- u-container(class='absolute mt-2 w-dvw items-end flex flex-col anchor-position pointer-events-none left-1/2 -translate-x-1/2')
		lazy-u-button(v-bind='props' :href="behance?.href" :label="t('section.portfolio')" class='rounded-lg cursor-pointer backdrop-blur size-fit pointer-event-auto' variant='soft' color='neutral' trailing-icon="i-heroicons-outline:external-link" size='xl')
</template>

<script setup lang="ts">
type Props = {
	active?: boolean
	sticky?: boolean
	back?: boolean
}

const slot = useSlots()
const hash = useHashRoute()
const { t } = useI18n()

const props = defineProps<Props>()

const { data, prev, next, go } = useNavigation()
const { data: user } = useUser()
const behance = computed(() => user.value.portfolio?.find(({ title }) => title === 'Behance'))

const menu = defineModel('open', { default: false })
const nav = useTemplateRef('nav')
const reveal = shallowRef(true)
const tooltip = shallowRef(true)

const styles = reactive({
	nav: ''
})

const toggle = () => menu.value = !menu.value
const navigate = (value: string) => {
	hash.value = value
	menu.value = false
	reveal.value = true

	const element = document.querySelector(`#${value}`)
	element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const state = {
	top: 0,
	delta: 0,
	position: 0,
	current: 0,
	start: false
}

const { desktop, platform } = useDisplay()
const { y, directions, arrivedState } = useWindowScroll({
	onScroll: () => {
		recolor()
		hide()
	},
	onStop: () => {
		hide()
		recolor()
		state.top = y.value
		// state.position = state.position > 50 ? 100 : 0
		// nav.value?.style.setProperty('--position', `${state.position}%`)
	},
	// idle: 1000,
	eventListenerOptions: {
		passive: true
	}
})

const recolor = () => {
	const set = new Set<string>(['transparency-safe:backdrop-blur', 'bg-default'])

	// Remove opacity on scroll top
	if (y.value === 0) set.add('bg-transparent')
	else set.add('transparency-safe:bg-default/80')

	styles.nav = Array.from(set).join(' ')
}

const hide = () => {
	if (!platform.value.touch) return
	reveal.value = y.value < 500 || arrivedState.top

	const multiplier = 1
	const delta = y.value - state.top
	const value = Math.max(Math.min(delta, 100 * multiplier), -100 * multiplier)
	state.position = value + (value < 0 ? 100 * multiplier : 0)

	const { top } = arrivedState
	if (top) state.position = 0
	// nav.value?.style.setProperty('--position', `${state.position / speed}%`)

	if (directions.bottom) state.position = 100
	else if (directions.top) state.position = 0
	nav.value?.style.setProperty('--position', `${state.position}%`)
}

const { current } = useMagicKeys({
	passive: false,
	onEventFired(event) {
		const keys = ['arrowdown', 'arrowup']
		const isKey = keys?.some(value => current.has(value))
		const isBody = document.activeElement?.tagName === 'BODY'

		if (!isKey || !isBody || current.size !== 1) return
		event.preventDefault()
		if (current.has('arrowdown')) next()
		if (current.has('arrowup')) prev()
	}
})

const ui = {
	container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
	button: {
		class: 'focus:outline-none focus:ring-1 focus:ring-inset focus:ring-neutral-600/50 dark:focus:ring-neutral-300/50',
		variant: 'ghost',
		color: 'neutral'
	},
	tooltip: {
		content: 'h-auto p-0 bg-transparent ring-transparent ring-0 shadow-none'
	}
}

const toast = useToast()

onMounted(() => {
	recolor()
	hide()

	watchThrottled(desktop, (value) => {
		if (value) menu.value = false
	}, { throttle: 100 })
})
</script>

<style lang="sass" scoped></style>
