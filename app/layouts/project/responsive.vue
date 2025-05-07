<template lang="pug">
div(class='flex items-stretch w-full content-between z-10 relative rounded-lg gap-4')
	nuxt-img(v-for='image in images' v-bind='image' class='rounded-lg grow h-full object-cover object-top ring' loading='lazy')
</template>

<script lang="ts" setup>
type Props = {
	detail?: boolean
	src?: string[]
	aspectRatio?: (`${number}/${number}` | number | 'auto')[]
}

const props = withDefaults(defineProps<Props>(), {
	aspectRatio: () => [],
	src: () => []
})

const images = computed(() => {
	return props.src?.map((src = '', index = 0) => {
		return {
			id: index,
			class: [
				'bg-neutral-200 dark:bg-neutral-900 aspect-(--aspect) light:opacity-(--opacity) dark:brightness-(--opacity) max-h-(--max-height) ', {
					'shadow-smooth max-w-3xs absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]': index !== 0
				},
				index === 0 ? 'scroll-up-animation' : 'slide-up-animation'
			],
			style: {
				'--max-height': 'calc(100% - 20%)',
				'--aspect': props.aspectRatio?.at(index),
				'--opacity': `${index !== 0 ? 100 : 50}%`
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
		transform: translateY(20dvh) scale(1.2);
		box-shadow: 0 0 transparent;
    }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-up-animation {
	// transform-origin: center;
    animation: scroll-up ease-in forwards;
    animation-timeline: view();
    animation-range: entry;
  }
  .slide-up-animation {
    animation: slide-up ease-in both;
    animation-timeline: view();
    animation-range: 20dvh 40dvh;
  }
}
</style>
