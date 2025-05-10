<template lang="pug">
div(:style class='fixed left-(--x) top-(--y) w-(--width) h-(--height) opacity-(--opacity) rounded-full blur-2xl z-100 bg-(--ui-primary) -translate-1/2 pointer-events-none transition-opacity ease-out duration-500 motion-reduce:hidden mix-blend-overlay')
</template>

<script lang="ts" setup>
const { x, y } = useMouse({
	scroll: false
})
const { width, height } = useWindowSize()

const distance = computed(() => {
	const dx = Math.abs(x.value - width.value / 2)
	const dy = Math.abs(y.value - height.value / 2)
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
})
const size = computed(() => Math.max(300 - distance.value / 3, 150))
const opacity = computed(() => Math.min(Math.max(size.value / 300, 0.1), 1))

const style = computed(() => {
	return {
		'--x': `${x.value}px`,
		'--y': `${y.value}px`,
		'--width': `${200}px`,
		'--height': `${size.value}px`,
		'--opacity': opacity.value
	}
})
</script>

<style lang='scss'>
</style>
