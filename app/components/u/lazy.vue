<template lang='pug'>
component(v-intersect='intersect' :is)
	transition(v-bind='options')
		slot(v-if='intersected')
</template>

<script lang='ts' setup>
import type { TransitionProps } from 'vue'

type Props = {
	transition?: Omit<TransitionProps, 'css'> | string
	disabled?: boolean
	delay?: number | string
	once?: boolean
	margin?: string
	threshold?: number | number[]
	as?: keyof HTMLElementTagNameMap
}

const props = withDefaults(defineProps<Props>(), {
	transition: () => ({ name: 'transition-fade' }),
	delay: () => 0,
	appear: () => true,
	once: () => true,
	as: () => 'div'
})

const intersected = shallowRef(!!props.disabled)
const is = computed(() => props.as)

const intersect = [
	(entries: IntersectionObserverEntry[]) => {
		entries.forEach(({ isIntersecting }) => {
			if (isIntersecting) intersected.value = true
		})
	}, {
		rootMargin: props.margin,
		threshold: props.threshold,
		once: props.once
	}
]

const options = computed(() => {
	const { transition, disabled } = props
	if (!transition || disabled) return { css: false }
	return typeof transition === 'string' ? { name: transition } : transition
})
</script>
