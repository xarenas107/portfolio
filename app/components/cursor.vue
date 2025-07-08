<template lang="pug">
div(class='absolute z-20 top-0 left-0 size-full pointer-events-none overflow-hidden')
	div(class="absolute" :style='{ opacity: 0 }' :id)
		svg(xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" class="absolute top-0 left-0 text-inverted")
			path(class='fill-primary stroke-default stroke-1' stroke-linecap="round" stroke-linejoin="round" d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z")

		u-badge(v-if='content' color="primary" class="absolute top-6 left-6 rounded-sm font-default leading-none ring ring-default") {{ content }}
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

const id = shallowRef(useId())
const selector = `#${id.value}`

const element = shallowRef(document.querySelector<HTMLElement>(props.target))
const { left, top, width, height } = useElementBounding(element)
const { width: outerWidth, height: outerHeight } = useWindowSize()
const { x, y } = useWindowScroll()
const { mobile } = useDisplay()

const state = reactive({
	comment: false,
	color: false
})

const move = async () => {
	element.value = document.querySelector<HTMLElement>(props.target)
	const cursor = document.querySelector<HTMLElement>(selector)
	if (!cursor) return

	if (cursor?.style.getPropertyValue('opacity') === '0') {
		await animate(cursor, {
			left: Math.round(Math.random() * outerWidth.value + x.value),
			top: Math.round(Math.random() * outerHeight.value + y.value)
		}, { duration: 0 }).finished

		await animate(cursor, { opacity: 1 }, { duration: 0.2 }).finished
	}

	if (props.target.includes('#home')) {
		if (!state.comment) {
			const comment = document.querySelector<HTMLElement>('#comment')

			if (comment?.checkVisibility()) {
				// await animate(comment, {
				// 	left: Math.round(Math.random() * outerWidth.value + x.value),
				// 	top: Math.round(Math.random() * outerHeight.value + y.value + 64)
				// }, { duration: 0.1 }).finished

				const { left = 0, top = 0, width = 0, height = 0 } = comment?.getBoundingClientRect() || {}

				// await animate(comment, { left, top, width, height }, { duration: 0 }).finished
				// comment.classList.add('fixed')

				await animate(cursor, {
					left: Math.round(left + x.value + width / 2),
					top: Math.round(top + y.value + height / 4)
				}, { duration: 0.8, delay: 0.4, ease: 'easeInOut' }).finished

				await animate(cursor, { scale: 0.8 }, { duration: 0.1, ease: 'linear' }).finished
				await animate(cursor, { scale: 1 }, { duration: 0.1, ease: 'linear' }).finished

				comment.classList.replace('opacity-0', 'opacity-100')
				comment.classList.replace('scale-0', 'scale-100')
				// await animate(comment, { '--opacity': 1 }, { duration: 0.1 }).finished

				state.comment = true
			}
		}
	}

	if (element.value?.checkVisibility()) {
		if (props.target.includes('#home')) {
			if (!state.color) {
				await animate(cursor, {
					left: Math.round(left.value + x.value + width.value / 2),
					top: Math.round(top.value + y.value + height.value / 4)
				}, { duration: 1, delay: 0.2, ease: 'easeInOut' }).finished

				await animate(cursor, { scale: 0.8 }, { duration: 0.1, ease: 'easeOut' }).finished
				await animate(cursor, { scale: 1 }, { duration: 0.1, ease: 'easeOut' }).finished
				await animate(element.value, { '--color': 'var(--ui-primary)' }).finished

				const inset = mobile.value ? width.value / 4 : 0
				await animate(cursor, {
					left: Math.round(left.value + x.value + width.value - inset),
					top: Math.round(top.value + y.value + height.value / 2)
				}, { duration: 0.8, ease: 'easeOut' }).finished

				state.color = true
			}
		}

		const inset = mobile.value ? width.value / 4 : 0

		await animate(cursor, {
			left: Math.round(left.value + x.value + width.value - inset),
			top: Math.round(top.value + y.value + height.value / 2)
		}).finished
	}
}

onMounted(async () => {
	// Animate cursors
	await new Promise(resolve => setTimeout(resolve, props.delay))
	element.value = document.querySelector(props.target)
	await move()
})

const unwatch = watch([y, outerWidth, outerHeight], async () => await move())
onUnmounted(() => unwatch())

// const useScrollSize = () => {
// 	const { scrollHeight = 0, scrollWidth = 0 } = document.documentElement

// 	const width = shallowRef(scrollWidth)
// 	const height = shallowRef(scrollHeight)

// 	const update = () => {
// 		const { scrollHeight, scrollWidth } = document.documentElement
// 		height.value = scrollHeight || 0
// 		width.value = scrollWidth || 0
// 	}

// 	onNuxtReady(update)
// 	onUpdated(update)

// 	return [width, height] as const
// }

// const [_, scrollHeight] = useScrollSize()
// const style = computed(() => {
// 	return {
// 		'--height': `${scrollHeight.value}px`
// 	}
// })
</script>

<style lang="scss" scoped></style>
