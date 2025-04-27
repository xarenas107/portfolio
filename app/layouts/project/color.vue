<template lang="pug">
div(class='flex flex-col items-stretch w-full content-between z-10 relative rounded-lg gap-12')
	nuxt-layout(name='project-section-paragraph' :title='t("color.name", 2)' :description) 

	div(class='flex flex-wrap gap-8 sm:max-h-48 lg:max-h-64')
		u-card(v-for='color, index in palette' class='basis-36 sm:max-w-48 lg:max-w-64 h-full grow content-end slide-up-animation' variant='outline' :style='{ "--ui-color": `${color}`, "--translate": index }')
			div(class='aspect-square w-full flex flex-col justify-end rounded-lg ring ring-inset bg-(--ui-color) overflow-hidden')
				span(class='text-10xl font-bold font-display leading-24 -ml-2 -indent-0.5 text-pretty text-(--ui-bg) text-stroke text-stroke-(--ui-border)') {{ index + 1 }}
			
			template(#footer)
				span(class='text-sm font-medium mix-blend-difference text-toned') {{ color }}

</template>
<script lang="ts" setup>
type Props = {
	palette?: string[]
	description?: string
}

withDefaults(defineProps<Props>(), {
	palette: () => [],
})

const { t } = useI18n()
</script>
