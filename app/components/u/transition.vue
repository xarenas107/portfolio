<template lang='pug'>
slot(v-if='active' :class='ui' :style :state)
</template>

<script lang='ts' setup>
type Props = {
	class?: string
	activeClass?: string
	beforeEnterClass?: string
	enterClass?: string
	delay?: number | string
	duration?: string | number
	timingFunction?: string
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	beforeEnterClass: () => ''
})

const ui = computed(() => {
	const { beforeEnterClass, enterClass, activeClass } = props
	if (state.done || props.disabled) return [enterClass, props.class]

	const data = new Set([
		activeClass,
		props.class,
		!state.pending ? beforeEnterClass : enterClass,
		'transition-all will-change-[all]'
	])

	return Array.from(data)
})

const style = computed(() => {
	const { duration, timingFunction } = props

	if (state.done || props.disabled) return ''
	return `
		transition-duration: ${parseDuration(duration)}; 
		transition-timing-function: ${timingFunction};
	`
})

const state = reactive({
	active: false,
	pending: false,
	idle: true,
	done: false
})
const active = defineModel({ default: false })

const parseDuration = (timeout?: string | number) => {
	if (typeof timeout === 'number') return `${timeout}ms`
	return timeout
}

const parseTimeout = (timeout?: string | number) => {
	if (typeof timeout === 'number') return timeout

	const isSeconds = timeout?.endsWith('s') && !timeout?.endsWith('ms')
	const [value] = timeout?.match(/\d?\.?\d+/) ?? ['0']
	const number = Number.parseFloat(value)
	return isSeconds ? number * 1000 : number
}

const reveal = () => {
	state.pending = true
	state.idle = false

	const timeout = parseTimeout(props.duration) + 100
	setTimeout(() => {
		state.done = true
		state.pending = false
	}, timeout)
}

onMounted(async () => {
	const { delay } = props

	active.value = true
	const timeout = parseTimeout(delay)
	await nextTick(() => setTimeout(reveal, timeout))
})
</script>
