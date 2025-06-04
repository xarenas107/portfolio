<template lang='pug'>
div(class='w-full py-24 min-h-svh flex flex-col gap-16 relative overflow-clip')

	div(v-bind='options' class='flex px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl mx-auto scroll-slide-animation')
		section-title(v-for='index in 6' :class='index % 2 ? "text-stroke paint-order-stroke text-default" : ui.title') {{ t('section.portfolio') }}

	u-container(:ui='ui.container')
		u-card-group(v-bind='options' class='z-20 mr-4 w-full' :ui='ui.card')
			template(#default='{ containerClass, childClass }')
				div(class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row-dense auto-rows-fr auto-cols-fr gap-4")

					nuxt-link(v-for='{ id, cover, title, highlighted } in data' @click.native='open' :class='[containerClass, { "row-span-2": highlighted }]' :id class="h-auto max-w-full rounded-lg cursor-pointer relative group/item")
						nuxt-img(:src='cover' :alt='title' :class='[childClass]' class='object-cover rounded-lg pointer-events-none' format='webp' width='400' height='400')

						div(class='absolute z-20 top-0 left-0 w-[100%] h-[100%] p-4 bg-(--ui-bg-accented)/70 place-content-end-safe opacity-0 group-hover/item:opacity-100 rounded-lg border backdrop-blur-xs transition-all duration-400 ease-out pointer-events-none group-hover/item:view-transition-name-[overlay]')
							div(class='flex flex-col gap-2 opacity-0 translate-y-24 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-transform duration-400 ease-out h-full place-center justify-center p-4')
								h4(class='text-default font-bold max-w-prose text-balance line-clamp-4 truncate text-center') {{ title }}
								//- h6(class='text-sm text-toned max-w-prose text-balance line-clamp-4 truncate') {{ description }}
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

const ui = {
	title: 'text-(--ui-primary)',
	container: {
		base: 'h-full w-full'
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

const open = (event: Event) => {
	event.preventDefault()

	const target = event.target as HTMLElement
	const { id = '' } = target

	const options = ['view-transition-name-[selected-project]']

	const transition = useViewTransition(async () => {
		target?.classList?.add(...options)
		await navigateTo({ name: 'project-id', params: { id } })
	}, event)

	// transition?.ready.then(async () => {
	// 	await navigateTo({ name: 'project-id', params: { id } })
	// })

	transition?.finished.then(() => {
		target.classList?.remove(...options)
	})
}
</script>

<style lang='scss' scoped>
@keyframes slide-from-end {
	from { transform: translateX(-100%) }
	to { transform: translateX(-50%) }
}

@media (prefers-reduced-motion: no-preference) {
	.scroll-slide-animation {
		animation: slide-from-end linear forwards;
		animation-timeline: view();
	}
}
</style>
