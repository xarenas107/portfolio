<template lang="pug">
u-card(:ui='ui.card' :class='[{ "mt-6": icon }]' class='relative')
	template(#header v-if='icon')
		u-avatar(size='lg' class='bg-primary-500 dark:bg-primary-600 absolute -top-6')
			u-icon(:name='icon' class='w-6 h-6 text-primary-50')

	div(class='flex flex-col gap-2 lg:gap-4 max-w-prose')
		h4(class='text-2xl lg:text-4xl font-semibold flex items-center') {{  title }}
		p(v-if='!slot.default' class='text-base opacity-80 text-balance') {{ content }}
		slot(:content)
</template>

<script lang="ts" setup>
type Props = {
	icon?: string
	title?: string
	content?: string
}
const slot = useSlots()

withDefaults(defineProps<Props>(), {
	icon: ''
})

const ui = {
	card: {
		background: 'bg-transparent dark:bg-transparent',
		ring: 'ring-1 ring-neutral-400 dark:ring-neutral-600'
	}
}
</script>

<style lang='scss' scoped>
</style>
