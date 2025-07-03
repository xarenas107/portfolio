<template lang="pug">
div(class="absolute z-20 pointer-events-none" :style="{ opacity: 0 }" :id)
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

onMounted(async () => {
	// Animate cursors
	await new Promise(resolve => setTimeout(resolve, props.delay))
	const selector = `#${id}`

	const element = computed(() => document.querySelector<HTMLElement>(props.target))
	const { left, top, width, height } = useElementBounding(element)
	const { x, y } = useWindowScroll()
	const { width: outerWidth, height: outerHeight } = useWindowSize()
	const { mobile } = useDisplay()

	const sequence = async () => {
		await animate(selector, {
			left: Math.round(Math.random() * outerWidth.value),
			top: Math.round(Math.random() * outerHeight.value + y.value)
		}, { duration: 0.1 }).finished

		await animate(`#${id}`, { opacity: 1 }, { duration: 0.2 }).finished
		await move()
	}

	const move = async () => {
		if (props.target.includes('#home')) {
			const color = 'var(--ui-primary)'
			const html = document.querySelector<HTMLElement>(props.target)
			if (html && html?.style.color !== color) {
				await animate(selector, {
					left: Math.round(left.value + x.value + width.value / 2),
					top: Math.round(top.value + y.value + height.value / 4)
				}, { duration: 1, delay: 0.2, ease: 'easeInOut' }).finished

				await animate(selector, { scale: 0.8 }, { duration: 0.1, ease: 'easeOut' }).finished
				await animate(selector, { scale: 1 }, { duration: 0.1, ease: 'easeOut' }).finished
				await animate(html, { color }, { duration: 0.2, ease: 'easeOut' }).finished
			}
		}

		const inset = mobile.value ? width.value / 4 : 0

		await animate(selector, {
			left: Math.round(left.value + x.value + width.value - inset),
			top: Math.round(top.value + y.value + height.value / 2)
		}).finished
	}

	await sequence()

	const events = ['scroll', 'resize']
	for (const event of events) {
		useEventListener(window, event, move, { passive: true })
	}
})
</script>

<style lang="scss" scoped></style>
