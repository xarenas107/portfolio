<template lang="pug">
div(class='flex flex-col items-stretch w-full content-between z-10 relative rounded-lg gap-12')
	nuxt-layout(name='project-section-paragraph' :title='t("color.name", 2)' :description)

	div(class='flex flex-wrap gap-4')
		u-badge(v-for='color in palette' :style='{ "--ui-color": `${color}` }' class='flex gap-2 items-center rounded-full py-2 pr-4' variant='outline' color='neutral')
			div(class='aspect-square w-full flex flex-col justify-end rounded-full ring ring-inset bg-(--ui-color) overflow-hidden size-8')
			span(class='text-base font-medium text-center text-toned') {{ color }}
</template>

<script lang="ts" setup>
type Props = {
	palette?: string[]
	description?: string
}

withDefaults(defineProps<Props>(), {
	palette: () => []
})

const { t } = useI18n()
</script>

<style lang="scss" scoped>
</style>
