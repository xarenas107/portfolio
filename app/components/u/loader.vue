<template lang='pug'>
//- u-progress(:model-value='progress' :max='scroll.max' :ui="ui.progress" :color :size :style  animation='carousel')
div(class='h-1 w-full fixed top-auto bottom-0 z-8000 origin-left pointer-events-none transition-transform flex gap-2 animate-timeline-scroll animate-from-0 animate-to-2 animate-name-[height-in,fade-in] animate-fill-both')
	span(class='h-full w-1/1 bg-inverted rounded-e-full animate-timeline-scroll animate-from-0 animate-to-100 animate-name-[width-in] animate-fill-both')
	span(class='h-full bg-accented grow rounded-s-full')
</template>

<script lang='ts' setup>
// type Props = {
// 	throttle?: number
// 	size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
// 	color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
// }

// const nuxt = useNuxtApp()

// const props = withDefaults(defineProps<Props>(), {
// 	throttle: 200,
// 	size: 'xs',
// 	color: 'primary'
// })

// const scroll = reactive({
// 	value: 0,
// 	max: 0,
// 	pending: false,
// 	error: false,
// 	timeout: setTimeout(() => {}, 0),
// 	done: false
// })

// const progress = computed(() => {
// 	if (scroll.pending) return undefined
// 	return scroll.value
// })

// const step = () => {
// 	if (scroll.done) return

// 	const { scrollTop, scrollHeight, clientHeight } = document.documentElement
// 	scroll.max = scrollHeight - clientHeight
// 	scroll.value = scrollTop

// 	requestAnimationFrame(step)
// 	scroll.done = true
// }

// const scrollProgress = () => {
// 	scroll.done = false
// 	if (import.meta.client) step()
// }

// useEventListener('scroll', () => {
// 	scrollProgress()
// })

// const color = computed(() => {
// 	return scroll.error ? 'error' : props.color || undefined
// })

// const style = computed(() => {
// 	return {
// 		transition: 'height 0.4s, opacity 0.4s'
// 	}
// })

// const ui = {
// 	progress: {
// 		root: 'fixed top-0 top-auto bottom-0 z-8000 origin-left pointer-events-none transition-transform opacity-(--opacity)',
// 		indicator: 'rounded-none',
// 		base: 'rounded-none bg-accented/50'
// 	}
// }

// onMounted(() => {
// 	scrollProgress()
// })

// nuxt.hook('page:loading:start', () => {
// 	clearTimeout(scroll.timeout)
// 	scroll.timeout = setTimeout(() => {
// 		scroll.pending = true
// 		scroll.error = false
// 	}, props.throttle)
// })

// nuxt.hook('page:loading:end', () => {
// 	clearTimeout(scroll.timeout)
// 	scroll.timeout = setTimeout(() => {
// 		scroll.pending = false
// 		scroll.error = false
// 	}, props.throttle)
// })
</script>

<style lang='scss' scoped>
</style>
