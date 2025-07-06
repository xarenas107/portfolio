<template lang="pug">
div(class='flex items-start z-20 ease-in transition-[scale,opacity] will-change-[scale,opacity] origin-top-left opacity-0 scale-0')#comment
	div(@click='focus' class='absolute bg-primary/10  transition-[padding,max-width,max-height,gap] duration-200 ease sm:hover:w-xs rounded-3xl hover:rounded-xl rounded-tl-xs hover:rounded-tl-xs p-1 hover:p-4 ring ring-default flex hover:gap-4 group origin-top-left pointer-events-auto' :class='{ "sm:focus:w-xs focus:rounded-xl focus:rounded-tl-xs focus:p-4 focus:gap-4": true }' tabindex="0" ref='comment')
		u-avatar(:alt="name" :ui='{ fallback: "text-inverted font-medium" }' class='bg-primary' size='md')

		div(class='flex-col gap-2 size-full invisible opacity-0 group-hover:opacity-100 delay-200 max-w-0 max-h-0 group-hover:max-h-none group-hover:max-w-none group-hover:visible overflow-hidden group-hover:flex transition-opacity w-full pointer-events-none' :class='{ "group-focus:opacity-100 group-focus:max-h-none group-focus:max-w-none group-focus:visible group-focus:flex": true }')
			div(class='flex gap-2 text-sm items-center')
				span(class='text-default font-medium') {{ name }}
				span ·
				span(class='text-muted') {{ relative }}

			p(class='text-toned text-sm') {{ content }}
</template>

<script lang="ts" setup>
import { capitalize } from 'vue'

type Props = {
	src?: string
	name?: string
	time?: Date | number
	content?: string
}

const { d, locale } = useI18n()

const comment = useTemplateRef('comment')
const [open, toggle] = useToggle()
onClickOutside(comment, () => {
	open.value = false
})

const props = withDefaults(defineProps<Props>(), {
	time: () => Date.now()
})

const relative = computed(() => {
	const timeMs = typeof props.time === 'number' ? props.time : props.time.getTime()
	const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)
	const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity] as const
	const units: Intl.RelativeTimeFormatUnit[] = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']

	const unitIndex = cutoffs.findIndex(value => value > Math.abs(deltaSeconds))
	const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

	const relative = new Intl.RelativeTimeFormat(locale.value, { numeric: 'auto' })
	const value = relative.format(Math.floor(deltaSeconds / (divisor || 1)), (units[unitIndex] || 'second'))
	return capitalize(value)
})

const focus = (event: MouseEvent) => {
	comment.value?.focus()
}
</script>

<style lang="scss" scoped>

</style>
