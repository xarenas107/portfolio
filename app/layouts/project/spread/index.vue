<template lang="pug">
section(class="flex flex-col gap-16")
	nuxt-layout(v-if='title || description' :title :description :small-title name='project-section-paragraph')

	div(class='flex w-full relative content-between z-10 grow shrink rounded-lg gap-2 lg:gap-4 justify-center flex-col sm:flex-row items-center sm:items-start -space-y-[30%] sm:space-y-0 sm:-space-x-[40%]')
		nuxt-picture(v-for='image in images' v-bind='image' class='max-w-full w-full rounded-lg shadow-smooth ring object-cover overflow-clip')
</template>

<script lang="ts" setup>
type Props = {
	detail?: boolean | 'reverse'
	src?: string[]
	aspectRatio?: `${number}/${number}` | number | 'auto'
	reverse?: boolean
	title?: string
	description?: string
	smallTitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	src: () => [],
	aspectRatio: () => 'auto'
})

const direction = computed(() => props.reverse ? 'reverse' : 'normal')

const images = computed(() => {
	return props.src?.map((src = '', index = 0) => {
		const shade = 900 - index * 100
		const { length } = props.src

		const detail = props.detail === true && index === 0
		const reverse = props.detail === 'reverse'
		const target = reverse && index + 1 === length
		const delta = props.detail ? -1 : 0
		const order = index + delta

		return {
			id: index,
			class: [
				'bg-(--color) aspect-(--aspect) basis-(--basis) z-(--order) light:contrast-(--opacity) dark:brightness-(--opacity)', {
					'bg-neutral-900': detail,
					'my-0 sm:mx-0': detail || (reverse && index + 2 === length)
				}
			],
			style: {
				'--order': detail ? -10 : -index,
				'--color': `var(--color-neutral-${shade}, var(--color-neutral-50))`,
				'--opacity': target ? '100%' : `${(length - order) * 100 / length}%`,
				'--aspect': props.aspectRatio,
				'--basis': `minmax(100%, 8rem)`,
				'--top': `${index + 1}rem`
			},
			imgAttrs: {
				class: 'size-full object-cover',
				width: '',
				height: '400'
			},
			alt: '',
			src
		}
	})
})
</script>

<style lang="scss" scoped>
@keyframes rotate {
  from {
	margin: 0;
	box-shadow: 0 0 transparent;
	filter: unset
  }
}

@media (prefers-reduced-motion: no-preference) {
  .spread-animation {
    animation: rotate ease-out both v-bind(direction);
    animation-timeline: view();
    animation-range: 20% 40%;
  }
}
</style>
