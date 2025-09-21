<template lang='pug'>
u-button(@click='event => toggle(color, event)' :aria-label='t(`color.${color}`)' :class='[state]' color="neutral" variant='link' class='rounded-lg ring-default' tabindex="0" size="xl")
	template(#leading)
		span(:class="[`bg-(--color) dark:bg-(--dark-color)`, 'flex h-3 w-3 aspect-square flex-shrink-0 rounded-full cursor-pointer']" :style='{ "--color": shade[500], "--dark-color": shade[400] }')
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

const { t } = useI18n()
const shade = computed(() => colors[props.color as keyof typeof colors] || colors.slate)
const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	color: () => 'primary'
})

const state = computed(() => {
	return props.active
		? 'bg-primary/20 hover:bg-primary/30'
		: 'hover:bg-inverted/10'
})

const toggle = (value: string, event: MouseEvent) => emit('change', value, event)
</script>
