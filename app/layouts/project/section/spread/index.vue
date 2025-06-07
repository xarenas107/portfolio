<template lang="pug">
section(class="flex flex-col gap-16")
	nuxt-layout(v-if='title || description' name='project-section-paragraph' :title :description :small-title)

	div(class='flex w-full relative content-between z-10 grow shrink rounded-lg gap-2 lg:gap-4 justify-center' :class='[landscape ? "flex-col sm:flex-row items-center sm:items-start -space-y-32 sm:space-y-0 sm:-space-x-32 sm:p-8 sm:bg-elevated" : "-space-x-32 bg-elevated p-8"]')
		nuxt-picture(v-for='image in images' v-bind='image' :class='landscape ? "max-w-full sm:max-w-64 md:max-w-72 lg:max-w-xs w-full" : "w-full max-w-48 sm:max-w-fit"' class='rounded-lg shadow-smooth spread-animation border border-accented max-h-120 object-cover overflow-clip')
</template>

<script lang="ts" setup>
type Props = {
	detail?: boolean | 'reverse'
	src?: string[]
	aspectRatio?: `${number}/${number}` | number | 'auto'
	reverse?: boolean
	landscape?: boolean
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
				class: 'w-full h-full object-cover',
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
    animation-range: 10% 50%;
  }
}
</style>
