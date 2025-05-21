<template lang="pug">
div(class='flex w-full content-between z-10 relative -space-x-32 grow shrink rounded-lg gap-2 lg:gap-4 bg-elevated justify-center p-0 lg:p-8')
	u-image(v-for='image in images' v-bind='image' class='rounded-lg shadow-smooth h-full grow shrink max-w-3xs spread-animation border border-(--ui-border)')
</template>

<script lang="ts" setup>
type Props = {
	detail?: boolean | 'reverse'
	src?: string[]
	aspectRatio?: `${number}/${number}` | number | 'auto'
	reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	src: () => [],
	aspectRatio: () => 'auto'
})

const { desktop } = useDisplay()

const style = computed(() => ({
	'--aspect': props.aspectRatio,
	'--basis': `minmax(100%, 10rem)`
}))

const direction = computed(() => props.reverse ? 'reverse' : 'normal')

const images = computed(() => {
	return props.src?.map((src = '', index = 0) => {
		const shade = 900 - index * 100
		const { length } = props.src

		const detail = props.detail === true && index === 0 && desktop.value
		const reverse = props.detail === 'reverse'
		const target = reverse && index + 1 === length

		return {
			id: index,
			class: [
				'bg-(--color) aspect-(--aspect) basis-(--basis) z-(--order) filter', {
					'bg-neutral-900': detail,
					'mx-0': detail || (reverse && index + 2 === length)
				}
			],
			style: {
				'--order': detail ? -10 : -index,
				'--color': `var(--color-neutral-${shade}, var(--color-neutral-50))`,
				'--tw-opacity': target ? '100%' : `${100 - index * 100 / length}%`,
				...style.value
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
	filter: contrast(1) brightness(1)
  }
}

@media (prefers-reduced-motion: no-preference) {
  .spread-animation {
    animation: rotate ease-out both v-bind(direction);
    animation-timeline: view();
    animation-range: 20dvh 50dvh;
  }
}

.filter {
	filter: contrast(var(--tw-opacity)) brightness(1);

	.dark & {
		filter: contrast(1) brightness(var(--tw-opacity));
	}
}
</style>
