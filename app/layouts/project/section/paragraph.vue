<template lang="pug">
section(class="flex flex-col gap-8")
	div(class='flex flex-col gap-2 w-full')
		h4(v-if='title' v-bind='ui.title' class='text-balance flex gap-2 font-display uppercase') {{ title }}
		article(v-if='description' style='--characters: 120' class='max-w-prose text-base sm:text-lg text-balance space-y-4')
			span(class="text-animation" class='space-y-4' v-html='description')

	nuxt-picture(v-if='src' :src v-bind='ui.image' class='w-full h-fit rounded-lg grow object-center ring bg-elevated object-cover overflow-clip scroll-up-animation')
</template>

<script lang="ts" setup>
type Props = {
	title?: string
	description?: string
	smallTitle?: boolean
	aspectRatio?: string
	src?: string
}

const props = withDefaults(defineProps<Props>(), {
	aspectRatio: '16/9'
})

const ui = computed(() => {
	return {
		title: {
			class: props.smallTitle ? 'font-semibod text-2xl' : 'font-bold text-2xl md:text-4xl lg:text-6xl xl:text-6xl'
		},
		image: {
			class: 'aspect-(--aspect)',
			imgAttrs: {
				class: 'size-full object-cover',
				width: '1200',
				height: ''
			},
			style:	{
				'--aspect': props.aspectRatio
			}
		}
	}
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
