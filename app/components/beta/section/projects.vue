<template lang='pug'>
div(class='w-full py-24 min-h-screen flex flex-col gap-16 relative overflow-clip')

	div(v-bind='options' class='flex px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl mx-auto scroll-slide-animation')
		section-title(v-for='index in 6' :class='index % 2 ? "text-stroke paint-order-stroke text-default" : ui.title') {{ t('section.portfolio') }}

	u-container(:ui='ui.container')
		//- u-input(placeholder="Search project" size="xl" icon='i-heroicons:magnifying-glass' class='max-w-prose' variant='soft' name='search')

		u-card-group(v-bind='options' class='z-20 mr-4 w-full' :ui='ui.card')
			template(#default='{ containerClass, childClass }')
				div(class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row-dense auto-rows-fr auto-cols-fr gap-4")

					u-link(v-for='{ id, cover, title, highlighted, pinned } in data' @click.prevent='open' :href='`/project/${id}`' :class='[containerClass, { "row-span-2": highlighted, "-order-1": pinned }]' :id class="h-auto flex flex-col gap-2 max-w-full rounded-lg cursor-pointer relative group/item scroll-up-animation focus:focus-visible:outline-2 focus:focus-visible:outline-inverted focus:focus-visible:outline-offset-2" )
						nuxt-picture(:src='cover' :alt='title' :class='[childClass]' :img-attrs class='object-cover rounded-lg overflow-clip pointer-events-none')

						div(class='absolute pointer-coarse:hidden z-20 top-0 left-0 w-[100%] h-[100%] p-2 sm:p-4 bg-(--ui-bg-accented)/70 place-content-end-safe opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 rounded-lg border backdrop-blur-xs transition-all duration-400 ease-out pointer-events-none group-hover/item:view-transition-name-[overlay]')
							div(class='flex flex-col gap-2 opacity-0 translate-y-24 group-focus-visible/item:translate-y-0 group-hover/item:translate-y-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-transform duration-400 ease-out h-full place-center justify-center p-4')
								h4(class='text-default font-bold max-w-prose text-balance line-clamp-6') {{ title }}
						h6(class='text-default text-sm max-w-prose hidden pointer-coarse:block') {{ title }}
</template>

<script lang='ts' setup>
type Props = {
	scaleDown?: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()
const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${base}` : base
	}
})

const { data } = useProjects()

const open = (event: Event) => {
	event.preventDefault()

	const target = event.target as HTMLElement
	const { id = '' } = target

	const options = ['view-transition-name-[selected-project]']

	const transition = useViewTransition(async () => {
		target?.classList?.add(...options)
		await navigateTo({ name: 'project-id', params: { id } })
	}, event)

	transition?.finished.then(() => {
		target.classList?.remove(...options)
	})
}

const ui = {
	title: 'text-(--ui-primary)',
	container: {
		root: 'h-full w-full'
	},
	placeholder: {
		svg: {
			base: 'dark:stroke-default bg-accented'
		}
	},
	card: {
		base: 'group-hover:bg-default/20 group-hover:from-(--ui-bg-inverted)',
		child: 'bg-default/80 text-inverted'
	}
}
const imgAttrs = {
	class: 'w-full h-full object-cover',
	width: '400',
	height: '400'
}
</script>

<style lang='scss' scoped>
@keyframes slide-from-end {
	from { transform: translateX(-100%) }
	to { transform: translateX(-50%) }
}

@keyframes scroll-up {
    from {
		object-position: center 20%;
		opacity: 0;
    }
}

@media (prefers-reduced-motion: no-preference) {
	.scroll-slide-animation {
		animation: slide-from-end linear both;
		animation-timeline: view();
	}
	.scroll-up-animation {
		animation: scroll-up ease-in both;
		animation-timeline: view();
		animation-range: entry;
	}
}
</style>
