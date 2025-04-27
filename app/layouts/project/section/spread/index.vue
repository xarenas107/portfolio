<template lang="pug">
div(class='flex w-full content-between z-10 relative -space-x-32 grow shrink rounded-lg gap-8 bg-elevated justify-center p-8')
	u-image(v-for='image in images' v-bind='image' class='rounded-lg shadow-smooth h-full grow shrink max-w-3xs spread-animation')

</template>
<script lang="ts" setup>
type Props = {
	detail?: boolean
	src?: string[]
	aspectRatio?: `${number}/${number}` | number | 'auto' 
}

const props = withDefaults(defineProps<Props>(), {
	src: () => [],
	aspectRatio: () => 'auto',
})


const { desktop } = useDisplay()

const style = computed(() => ({
	"--aspect": props.aspectRatio,
	'--basis': `minmax(100%, 10rem)`,
}))

const images = computed(() => {
	return props.src?.map((src = '', index = 0) => {
		const shade = 900 - index * 100
		const detail = props.detail && index === 0 && desktop.value

		return {
			id: index,
			class: [
				'bg-(--color) aspect-(--aspect) basis-(--basis) z-(--order) filter', {
					'bg-neutral-900 mx-0': desktop.value && detail,
				}
			],
			style: {
				"--order": detail ? -10 : -index, 
				"--color": `var(--color-neutral-${ shade }, var(--color-neutral-50))`,
				"--tw-opacity": `${ 100 - index * 100 / props.src.length }%`,
				...style.value,
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
    animation: rotate ease-out both;
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
