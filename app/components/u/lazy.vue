<template lang='pug'>
component(v-intersect='intersect' :is :style)
	u-transition(v-if='intersected' v-bind='options')
		template(#default='{ state, ...props }')
			div(v-bind='props' class='size-full')
				slot(v-bind='props' )
</template>

<script lang='ts' setup>
type Props = {
	activeClass?: string
	beforeEnterClass?: string
	enterClass?: string
	duration?: string | number
	timingFunction?: string

	disabled?: boolean
	delay?: number | string
	once?: boolean
	margin?: string
	threshold?: number | number[]
	minHeight?: string | number
	minWidth?: string | number
	as?: keyof HTMLElementTagNameMap
}

const props = withDefaults(defineProps<Props>(), {
	beforeEnterClass: () => 'opacity-0',
	duration: () => '.5s',
	timingFunction: () => 'linear',
	delay: () => 0,
	appear: () => true,
	once: () => true,
	as: () => 'div'
})

const style = useDimension(props)

const intersected = shallowRef(!!props.disabled)
const is = computed(() => props.as)

const parseTimeout = (timeout?: string | number) => {
	if (typeof timeout === 'number') return timeout

	const isSeconds = timeout?.endsWith('s') && !timeout?.endsWith('ms')
	const [value] = timeout?.match(/\d?\.?\d+/) ?? ['0']
	const number = Number.parseFloat(value)
	return isSeconds ? number * 1000 : number
}

const intersect = [
	(entries: IntersectionObserverEntry[]) => {
		entries.forEach(({ isIntersecting }) => {
			if (isIntersecting) {
				setTimeout(() => intersected.value = true, parseTimeout(props.delay))
			}
		})
	}, {
		rootMargin: props.margin,
		threshold: props.threshold,
		once: props.once
	}
]

const options = computed(() => {
	const { beforeEnterClass, enterClass, activeClass, disabled, timingFunction, duration } = props
	if (disabled) return {}
	return { beforeEnterClass, enterClass, activeClass, disabled, timingFunction, duration }
})
</script>
