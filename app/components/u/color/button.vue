<template lang='pug'>
div(@click='event => toggle(color, event)' :class='[state]' class='p-2 rounded-lg')
    span(:class="[`bg-(--color) dark:bg-(--dark-color)`, 'flex h-3 w-3 aspect-square flex-shrink-0 rounded-full cursor-pointer']" :style='`--color: ${shade[500]}; --dark-color: ${shade[500]}`' aria-hidden="true")
</template>

<script lang='ts' setup>
import colors from 'tailwindcss/colors'

type Props = {
	color?: string
	active?: boolean
}

type Emit = {
	(e: 'change', value: string, event: MouseEvent): void
}

const shade = computed(() => colors[props.color as keyof typeof colors] || colors.slate)
const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	color: () => 'primary'
})

const state = computed(() => {
	return props.active
		? 'bg-(--ui-primary)/10 hover:bg-(--ui-primary)/20'
		: 'hover:bg-(--ui-text)/10'
})

const toggle = (value: string, event: MouseEvent) => emit('change', value, event)
</script>

<style lang='scss' scoped>
</style>
