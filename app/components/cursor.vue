<template lang="pug">
div(class='absolute z-20 top-0 left-0 w-dvw min-h-dvh h-(--height) pointer-events-none overflow-hidden' :style)
	div(class="absolute" :style='{ opacity: 0 }' :id)
		svg(xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" class="absolute top-0 left-0 drop-shadow text-inverted")
			path(class='fill-primary' stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z")

		u-badge(v-if='content' color="primary" class="absolute top-6 left-6 rounded-sm font-default leading-none ring ring-(--ui-bg)") {{ content }}
</template>

<script setup lang="ts">
import { animate } from 'motion-v'

type Props = {
	target: string
	content?: string
	delay?: number
}
const props = withDefaults(defineProps<Props>(), {
	delay: 1000
})

const id = useId()
const selector = `#${id}`

const element = shallowRef(document.querySelector<HTMLElement>(props.target))
const { left, top, width, height } = useElementBounding(element)
const { width: outerWidth, height: outerHeight } = useWindowSize()
const { x, y } = useWindowScroll()
const { mobile } = useDisplay()

const move = async () => {
	element.value = document.querySelector<HTMLElement>(props.target)
	const cursor = document.querySelector<HTMLElement>(selector)
	if (!cursor) return

	if (cursor?.style.opacity === '0') {
		await animate(cursor, {
			left: Math.round(Math.random() * outerWidth.value + x.value),
			top: Math.round(Math.random() * outerHeight.value + y.value)
		}, { duration: 0.1 }).finished

		await animate(cursor, { opacity: 1 }, { duration: 0.2 }).finished
	}

	if (props.target.includes('#home')) {
		const color = 'var(--ui-primary)'
		if (element.value && element.value?.style.color !== color) {
			await animate(cursor, {
				left: Math.round(left.value + x.value + width.value / 2),
				top: Math.round(top.value + y.value + height.value / 4)
			}, { duration: 1, delay: 0.2, ease: 'easeInOut' }).finished

			await animate(cursor, { scale: 0.8 }, { duration: 0.1, ease: 'easeOut' }).finished
			await animate(cursor, { scale: 1 }, { duration: 0.1, ease: 'easeOut' }).finished
			await animate(element.value, { '--color': color }, { duration: 0 }).finished
		}
	}

	const inset = mobile.value ? width.value / 4 : 0

	await animate(cursor, {
		left: Math.round(left.value + x.value + width.value - inset),
		top: Math.round(top.value + y.value + height.value / 2)
	}).finished
}

tryOnMounted(async () => {
	// Animate cursors
	await new Promise(resolve => setTimeout(resolve, props.delay))
	element.value = document.querySelector(props.target)
	await move()
})

const unwatch = watch([y, outerWidth, outerHeight], async () => await move())
onUnmounted(() => unwatch())

const useScrollSize = () => {
	const { scrollHeight = 0, scrollWidth = 0 } = document.documentElement

	const width = shallowRef(scrollWidth)
	const height = shallowRef(scrollHeight)

	const update = () => {
		const { scrollHeight, scrollWidth } = document.documentElement
		height.value = scrollHeight || 0
		width.value = scrollWidth || 0
	}

	onNuxtReady(update)
	onUpdated(update)

	return [width, height] as const
}

const [_, scrollHeight] = useScrollSize()
const style = computed(() => {
	return {
		'--height': `${scrollHeight.value}px`
	}
})
</script>

<style lang="scss" scoped></style>
