<template lang="pug">
div(class='flex flex-col sm:flex-row gap-6 sm:items-center max-w-prose')
	u-avatar(size='3xl' :alt="item?.name" :src="item?.image" :ui='ui.avatar')
	div(class='flex flex-col gap-2 text-balance')
		h4(class='text-xl lg:text-2xl font-semibold flex items-center') {{ item?.name }}
		blockquote(class='italic opacity-50') "{{ item?.quote }}"
		p(class='text-base opacity-80') {{ item?.description }}

		//- div(class='flex gap-2 flex-wrap group mt-2 opacity-50')
		//- 	u-badge(v-for='[key, value] of item?.props' :ui='ui.badge' variant='outline') {{ key }}: {{  value }}
</template>

<script lang="ts" setup>
type Props = {
	item: {
		image?: string
		name?: string
		quote?: string
		description?: string
		// props: [string, string | number][]
	}
}

defineProps<Props>()

const ui = {
	avatar: {
		background: 'bg-primary-500 dark:bg-primary-600',
		placeholder: 'font-medium leading-none text-primary-50 dark:text-primary-50 truncate'
	},
	badge: {
		base: `w-fit h-fit text-nowrap gap-2`,
		color: {
			primary: {
				outline: `ring-1 ring-inset text-current dark:text-current ring-current dark:ring-current`
			}
		}
	}
}
</script>

<style lang='scss' scoped>
</style>
