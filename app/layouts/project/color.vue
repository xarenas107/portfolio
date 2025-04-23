<template lang="pug">
div(class='flex flex-col items-stretch w-full content-between z-10 relative rounded-lg gap-12')
	nuxt-layout(name='project-section-paragraph' :title='t("color.name", 2)' :description) 

	div(class='flex flex-wrap gap-8 sm:max-h-48 lg:max-h-64')
		//- div(v-for='color, index in palette' class='flex flex-col gap-4 grow max-w-prose')
			//- u-progress(color='primary' :model-value='90 / ( index + 1)' :max='100' :style='{ "--ui-primary": color, "--ui-bg-accented": "transparent" }' size='xl' class='max-w-prose')
		u-card(v-for='color, index in palette' class='basis-36 sm:max-w-48 lg:max-w-64 h-full grow ring bg-(--ui-color) text-(--ui-color) content-end slide-up-animation' variant='solid' color='primary' :style='{ "--ui-color": color, "--translate": index }')
			template(#header)
				span(class='text-10xl font-bold font-display mix-blend-difference leading-32 opacity-50') {{ index + 1 }}
			
			template(#footer)
				span(class='text-sm font-medium mix-blend-difference opacity-50') {{color }}

</template>
<script lang="ts" setup>
type Props = {
	palette?: string[]
	description?: string
}

const props = withDefaults(defineProps<Props>(), {
	palette: () => [],
})

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@keyframes slide-up {
  from {
	transform: translateY(calc(80% * (var(--translate) + 1)))
  }
}

@media (prefers-reduced-motion: no-preference) {
  .slide-up-animation {
    animation: slide-up ease-in forwards;
    animation-timeline: view();
    animation-range: 0 50%;
  }
}
</style>
