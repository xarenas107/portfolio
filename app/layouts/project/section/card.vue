<template lang="pug">
u-card(v-if='active' class='relative bg-accented' variant='outline')
	template(#header v-if='icon')
		div(class='flex gap-2 items-center')
			u-icon(:name='icon' class='size-8')
			h4(class='text-2xl font-semibold flex items-center font-display') {{ title }}

	div(class='flex flex-col gap-2 lg:gap-4 max-w-prose')
		p(v-if='!slot.default' class='text-base text-toned text-balance') {{ content }}
		slot(:content)
</template>

<script lang="ts" setup>
type Props = {
	icon?: string
	title?: string
	content?: string
	active?: boolean
}
const slot = useSlots()

withDefaults(defineProps<Props>(), {
	icon: '',
	active: true
})
</script>
