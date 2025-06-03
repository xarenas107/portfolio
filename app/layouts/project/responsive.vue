<template lang="pug">
section(class="flex flex-col gap-16")
	nuxt-layout(v-if='title || description' name='project-section-paragraph' :title :description small)

	div(class='flex items-stretch w-full content-between relative rounded-lg gap-4 bg-elevated')
		nuxt-img(:src='background' class='rounded-lg grow h-full object-cover object-top ring bg-accented scroll-up-animation opacity-20 aspect-16/9' loading='lazy')
		div(class='absolute top-1/2 -translate-1/2 left-1/2 flex gap-4 slide-up-animation')
			nuxt-img(v-for='image in images' v-bind='image' class='rounded-lg grow mt-(--top) h-50 sm:h-72 md:h-96 lg:h-100 object-cover object-top ring shadow-smooth max-w-3xs slide-animation' loading='lazy')
	</template>

<script lang="ts" setup>
type Props = {
	detail?: boolean
	background?: string
	src?: string[]
	aspectRatio?: `${number}/${number}` | number | 'auto'
	title?: string
	description?: string
}

const props = withDefaults(defineProps<Props>(), {
	aspectRatio: () => '1/2',
	src: () => []
})

const images = computed(() => {
	return props.src?.map((src = '', index = 0) => {
		return {
			id: `${index}`,
			class: [
				'bg-elevated aspect-(--aspect) light:opacity-(--opacity) dark:brightness-(--opacity) max-h-(--max-height)'
			],
			style: {
				'--max-height': 'calc(100% - 20%)',
				'--aspect': `${props.aspectRatio}`,
				'--opacity': `100%`,
				'--top': `${index * 10}%`,
				'--z-index': `${-index}`
			},
			alt: '',
			src
		}
	})
})
</script>

<style lang="scss" scoped>
@keyframes scroll-up {
    from {
		object-position: center -10dvh;
		opacity: 0;
    }
}

@keyframes slide-up {
    from {
		transform: translateY(2dvh) scale(1.2);
		box-shadow: 0 0 transparent;
    }
}

@keyframes slide {
    from { margin-top: 0 }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-up-animation {
    animation: scroll-up ease-in forwards;
    animation-timeline: view();
    animation-range: entry;
  }
  .slide-up-animation {
    animation: slide-up ease-in both;
    animation-timeline: view();
    animation-range: entry-crossing;
  }

	.slide-animation {
		animation: slide ease-in both;
		animation-timeline: view();
		animation-range: entry;
	}
}
</style>
