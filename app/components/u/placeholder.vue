<template lang='pug'>
div(class='overflow-hidden placeholder')
	svg(v-bind='options' class='inset-0 h-full w-full' fill='none')
		defs
			pattern(x='0' y='0' width='10' id='stroke-pattern' height='10' patternUnits='userSpaceOnUse')
				path(d='M-3 13 15-5M-5 5l18-18M-1 21 17 3')
		rect(stroke='none' fill='url(#stroke-pattern)' width='100%' height='100%')
</template>

<script lang='ts' setup>
type Props = {
	pending?: boolean
	disabled?: boolean
	ui?: {
		svg?: {
			base?: string
			opacity?: string | number
		}
	}
}

const props = withDefaults(defineProps<Props>(), {
	pending: () => true,
	contentClass: () => 'z-10',
	ui: () => ({})
})

const options = computed(() => {
	const {
		opacity = 30,
		base = 'bg-neutral-500 stroke-primary-600 dark:bg-neutral-500 dark:stroke-primary-400'
	} = props.ui?.svg || {}

	return {
		class: [{
			'hidden': props.disabled || !props.pending,
			'animate-none': !props.pending,
			'motion-safe:animate-pulse': props.pending && !props.disabled,
			[`opacity-${opacity}`]: opacity
		}, base]
	}
})
</script>
