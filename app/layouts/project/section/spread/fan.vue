<template lang="pug">
section(class="flex flex-col gap-16")
	nuxt-layout(v-if='title || description' name='project-section-paragraph' :title :description :small-title)

	div(class='flex w-full content-stretch z-10 relative rounded-lg h-50 sm:h-90 md:h-100 lg:h-120 justify-center bg-elevated gap-8')
		nuxt-picture(v-for='image in images' v-bind='image' class='rounded-lg shadow-smooth h-full max-w-3xs absolute origin-bottom border border-default spread-animation object-cover overflow-clip' format='webp')
</template>

<script lang="ts" setup>
type Props = {
	title?: string
	description?: string
	detail?: boolean
	cover?: string
	src?: string[]
	alt?: string
	aspectRatio?: `${number}/${number}` | number | 'auto'
	smallTitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	src: () => [],
	aspectRatio: () => 'auto'
})

const images = computed(() => {
	const { src, alt } = props
	const total = src.length || 0
	const half = total / 2
	const round = Math.floor(half)

	return src.map((src = '', index = 0) => {
		const shade = 900 - index * 100
		const { length } = props.src

		const detail = props.detail && index < 2
		const delta = props.detail ? -1 : 0
		const order = index + delta

		const angle = 45
		const beta = props.detail && index === 0 ? 1 : index
		const rotation = angle / total * (beta - round)

		const percent = 40
		const alpha = props.detail ? index === 0 ? -100 + percent : percent : 0
		const translate = -12 * (half - index) + alpha

		return {
			id: index,
			class: ['bg-(--color) aspect-(--aspect) basis-(--basis) z-(--order) rotate-(--rotate) translate-x-(--translate-x) light:contrast-(--opacity) dark:brightness-(--opacity)', {
				'lg:bg-neutral-900 lg:mx-0': detail
			}],
			style: {
				'--order': -index,
				'--color': `var(--color-neutral-${shade}, var(--color-neutral-50))`,
				'--rotate': `${rotation}deg`,
				'--translate-x': `${translate}%`,
				'--opacity': detail ? '100%' : `${(length - order) * 100 / length}%`,
				'--aspect': props.aspectRatio,
				'--basis': `minmax(100%, 10rem)`
			},
			imgAttrs: {
				class: 'w-full h-full object-cover',
				width: '',
				height: '800'
			},
			alt,
			src
		}
	})
})
</script>

<style lang="scss" scoped>
@keyframes rotate {
  from {
	rotate: 0deg;
	translate: 0 0;
	filter: unset
  }
}

@media (prefers-reduced-motion: no-preference) {
  .spread-animation {
    transform-origin: bottom;
    animation: rotate ease-in both;
    animation-timeline: view();
    animation-range: 0% 50%;
  }
}
</style>
