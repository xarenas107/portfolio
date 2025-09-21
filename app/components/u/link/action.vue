<template lang='pug'>
u-link(v-if='active' :to='href' :class='["flex items-center gap-2", classes]' :disabled='disabled || !href' class="focus-visible:rounded focus-visible:outline-2 focus-visible:outline-inverted focus-visible:outline-offset-4" target="_blank")
    u-icon(v-if='icon' :name='icon' class='h-6 w-6')
    span(v-if='title') {{ title }}
</template>

<script lang='ts' setup>
type Props = {
	href?: string
	title?: string
	icon?: string
	active?: boolean
	disabled?: boolean
	ui?: {
		text?: string
	}
}
const props = withDefaults(defineProps<Props>(), {
	active: true
})

const classes = computed(() => {
	const {
		text = 'text-base hover:text-(--ui-primary)'
	} = props.ui || {}

	if (props.disabled || !props.href) return 'opacity-50 pointer-events-none'
	return text
})
</script>
