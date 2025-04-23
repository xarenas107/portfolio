<template lang="pug">
div(class='flex w-full content-stretch z-10 relative rounded-lg h-50 sm:h-90 md:h-100 lg:h-120 justify-center bg-neutral-200 dark:bg-neutral-900 gap-8')
	u-image(v-for='image in images' v-bind='image' class='rounded-lg shadow-smooth h-full max-w-3xs absolute origin-bottom spread-animation')

</template>
<script lang="ts" setup>
type Props = {
	detail?: boolean
	cover?: string
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
	return props.src.map((src = '', index = 0) => {
		const shade = 900 - index * 100
		
		const detail = props.detail && index === 0
		const delta = props.detail ? -1 : 0
		const order = index + delta

		const deltaR =  (detail ? 0 : order) + 2
		const rotation = -4 * (props.src.length / 2 - deltaR)

		const deltaT =  (props.detail && index === 0 ? -100 : 0) + 40
		const translate =  -12 * (props.src.length / 2 - index) + deltaT

		return {
			id: index,
			class: ['bg-(--color) aspect-(--aspect) basis-(--basis) z-(--order) rotate-(--rotate) translate-x-(--translate-x) light:contrast-(--opacity) dark:brightness-(--opacity)',{
				'bg-neutral-900 mx-0': desktop.value && detail,
			}],
			style: { 
				"--order": -index, 
				"--color": `var(--color-neutral-${ shade }, var(--color-neutral-50))`,
				"--rotate": `${ rotation }deg`,
				"--translate-x":`${ translate }%`,
				"--opacity": detail ? '100%' : `${ 100 - order * 100 / props.src.length }%`,
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
	rotate: 0deg;
	translate: 0 0
  }
}

@media (prefers-reduced-motion: no-preference) {
  .spread-animation {
    transform-origin: bottom;
    animation: rotate ease-in forwards;
    animation-timeline: view();
    animation-range: entry-crossing;
  }
}
</style>
