<template lang='pug'>
component(:is='as' class='flex gap-4 group' ref='card-group')
    div(v-if='items?.length' v-for='item, index in items' :class='[classes.base, classes.before, classes.after]')
        slot(name='item' :props='{ class: classes.child }' :item :index)

    slot(v-else :child-class='classes.child' :container-class='[classes.base, classes.before, classes.after]')
</template>

<script lang='ts' generic='T extends Record<string, any>' setup>
type Props = {
	glowOnHover?: boolean
	color?: string
	as?: keyof HTMLElementTagNameMap
	selector?: keyof HTMLElementTagNameMap | (string & {})
	ui?: {
		border?: string | number
		child?: string
		before?: string
		after?: string
		base?: string
		rounded?: string
	}
}

const props = withDefaults(defineProps<Props>(), {
	border: () => 'px',
	as: () => 'ul',
	ui: () => ({}),
	selector: () => '.group-item'
})

const items = defineModel<T[]>('items', { default: () => [] })
const group = useTemplateRef<HTMLDivElement>('card-group')

const data = reactive({
	mouse: { x: 0, y: 0 },
	size: { w: 0, h: 0 }
})

const classes = computed(() => {
	const { color = 'neutral' } = props
	const { border = 'px', rounded = 'lg',
		base = `bg-${color}-400 dark:bg-${color}-700`,
		child = `bg-${color}-200 dark:bg-${color}-900 text-${color}-200 dark:text-${color}-300`,
		before = `before:bg-${color}-600 dark:before:bg-${color}-200`,
		after = `after:bg-${color}-500 dark:after:bg-${color}-500`
	} = props.ui || {}

	const ui = {
		base: `group-item relative p-${border} overflow-clip ${base} rounded-${rounded} w-full`,
		child: `relative h-full z-20 overflow-clip ${child}`,
		before: `before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] group-hover:before:opacity-100 before:z-10 before:blur-[100px] ${before}`,
		after: `after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] hover:after:opacity-10 after:z-30 after:blur-[100px] ${after}`
	}

	return ui
})

const on = {
	resize: () => {
		data.size = {
			w: group.value?.offsetWidth || 0,
			h: group.value?.offsetHeight || 0
		}
	},
	mousemove: (event: MouseEvent) => {
		const { clientX, clientY } = event
		const { left = 0, top = 0 } = group.value?.getBoundingClientRect() || {}
		const { w, h } = data.size
		const x = clientX - left
		const y = clientY - top
		const inside = x < w && x > 0 && y < h && y > 0
		if (inside) {
			data.mouse = { x, y }

			const target = group.value?.querySelectorAll(props.selector) || group.value?.children || []
			const items = Array.from(target) as HTMLDivElement[]

			items.forEach((child) => {
				const rect = child.getBoundingClientRect()
				const x = -(rect.left - left) + data.mouse.x
				const y = -(rect.top - top) + data.mouse.y

				child?.style?.setProperty('--mouse-x', `${x}px`)
				child?.style?.setProperty('--mouse-y', `${y}px`)
			})
		}
	}
}

onMounted(() => {
	// Start events
	on.resize()
	useEventListener('resize', on.resize)
	useEventListener('mousemove', on.mousemove)
})
</script>

<style lang='scss' scoped>
</style>
