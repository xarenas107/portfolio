<template lang="pug">
u-main(ref='main' class='skew-y-(--skew) transition-(--transition-property) duration-200 ease-out')
    slot
</template>

<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue'

type State = {
	scroll: number
	timer?: NodeJS.Timeout
	pause?: boolean
	current: number
	ease: number
}

const reduceMotion = usePreferredReducedMotion()
const main = useTemplateRef<ComponentPublicInstance>('main')
const state: State = {
	scroll: 0,
	pause: true,
	current: 0,
	ease: 0.75
}

const update = (event: Event) => {
	if (state.pause || reduceMotion.value === 'reduce') return

	const diff = state?.scroll - window.scrollY
	const clamp = Math.max(-30, Math.min(diff, 30))
	const speed = Math.round(clamp) * 0.1

	const element = main.value?.$el as HTMLElement

	if (element) {
		// element.style.transform = `skewY(${speed}deg)`
		element.style.setProperty('--skew', `${speed}deg`)
		element.style.setProperty('filter', `blur(${Math.abs(speed) / 2}px)`)
		// element.style.transition = 'ease-out .2s'
		// element.style.setProperty('--transition-duration', `.2s`)
		// element.style.setProperty('--transition-timing-function', `ease-out`)
		// element.style.transitionProperty = 'transform filter'
		element.style.setProperty('--transition-porperty', 'transform filter')
	}

	state.scroll = window.scrollY

	if (state.timer) clearTimeout(state.timer)
	state.timer = setTimeout(() => {
		if (element) {
			// element.style.transform = 'skewY(0deg)'
			element.style.removeProperty('--skew')
			element.style.removeProperty('filter')
		}
	}, 150)
}

useEventListener('scroll', update, {
	passive: true
})

onBeforeUpdate(() => {
	state.pause = true
})
onUpdated(() => state.pause = false)

onMounted(() => {
	state.scroll = window.scrollY
	state.pause = false
})
</script>

<style lang='scss'>
</style>
