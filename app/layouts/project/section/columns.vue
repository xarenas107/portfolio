<template lang="pug">
section(class="flex flex-col gap-8")
  nuxt-layout(name='project-section-paragraph' :title :description :small-title)

  div(class='grid grid-rows-1 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-16 pt-8 sm:pt-12 md:pt-20 lg:pt-24 xl:pt-32 z-20 lg:m-auto')
    nuxt-layout(v-for='{ title, description, src }, index in items' name='project-section-paragraph' :class='`scroll-fade-animation lg:col-start-(--place) row-start-(--place)`' :style='{ "--place": index + 1 }' :title :description :src small-title)
</template>

<script lang="ts" setup>
type Props = {
	active?: boolean
	title?: string
	description?: string
	smallTitle?: boolean
	items?: {
		title?: string
		description?: string
		src?: string
	}[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
@keyframes fade {
  from {
    transform: translateY(20svh);
    opacity: 0
  }
  40%, 70% {
    transform: translateY(0dvw);
    opacity: 100%
  }
  to {
    transform: translateY(-20h);
    opacity: 0
  }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-fade-animation {
    animation: fade ease both;
    animation-timeline: view();
    animation-range: 20% 100%;
  }
}
</style>
