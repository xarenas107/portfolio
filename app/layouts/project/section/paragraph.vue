<template lang="pug">
section(class="flex flex-col gap-8")
	div(class='flex flex-col gap-2 w-full')
		h4(v-if='title' class='text-balance flex gap-2 font-display uppercase' :class='[styles]') {{ title }}
		article(v-if='description' style='--characters: 120' class='max-w-prose text-base sm:text-lg text-balance space-y-4')
			span(class="text-animation" class='space-y-4' v-html='description')

	nuxt-img(v-if='src' :src class='rounded-lg grow h-full object-center ring bg-elevated object-cover sm:aspect-2/1 md:aspect-3/1 scroll-up-animation text-default' fit='cover' format='webp')
</template>

<script lang="ts" setup>
type Props = {
	title?: string
	description?: string
	smallTitle?: boolean
	src?: string
}

const props = withDefaults(defineProps<Props>(), {
})

const styles = computed(() => {
	if (props.smallTitle) return 'font-semibod text-2xl'
	return 'font-bold text-2xl md:text-4xl lg:text-6xl xl:text-6xl'
})
</script>

<style lang="scss" scoped>
@keyframes scroll-up {
    from {
		object-position: center -10dvh;
		opacity: 0;
    }
}
@keyframes text {
	from { background-size: 0 }
	to { background-size: 100% }
}

@media (prefers-reduced-motion: no-preference) {
  .text-animation {
	background: linear-gradient(90deg, var(--ui-text) 0 0) 0 / calc(var(--characters) * 1ch) var(--ui-text-dimmed);
	background-repeat: no-repeat;

	-webkit-background-clip: text;
	-moz-background-clip: text;
	background-clip: text;

	color: transparent;
    animation: text .1s steps(var(--characters, 100)) both;
    animation-timeline: view();
	animation-range: 10% 40%;
  }

  .scroll-up-animation {
    animation: scroll-up ease-in forwards;
    animation-timeline: view();
    animation-range: entry;
  }
}
</style>
