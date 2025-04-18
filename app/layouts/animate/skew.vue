<template lang="pug">
u-main(ref='main')
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
		element.style.transform = `skewY(${speed}deg)`
		element.style.filter = `blur(${Math.abs(speed)}px)`
		element.style.transition = 'ease-out .2s'
		element.style.transitionProperty = 'transform filter'
	}

	state.scroll = window.scrollY

	if (state.timer) clearTimeout(state.timer)
	state.timer = setTimeout(() => {
		if (element) {
			element.style.transform = 'skewY(0deg)'
			element.style.filter = 'blur(0px)'
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
