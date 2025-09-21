<template lang="pug">
div(class='overflow-clip min-h-16 bg-primary relative flex motion-safe:min-h-screen flex-col')
	div(class='h-64 w-full bg-primary flex')
		u-container(v-bind='options' class='h-full w-full origin-bottom items-end flex')
			section-title(:class='ui.title' class="animate-fill-both animate-ease-in-out animate-to-60 motion-safe:animate-timeline-view motion-safe:animate-slide-y-100" data-cursor="true" hyphens) {{  tc('section.experience', 2) }}

	div(class='relative flex w-full bg-default h-full motion-safe:min-h-[150vh] py-24 grow motion-reduce:overflow-auto scroll-hidden')
		div(v-bind='options' class='px-4 sm:px-6 motion-reduce:pr-0 motion-reduce:sm:pr-0 motion-reduce:lg:pr-0 max-w-7xl lg:px-8 gap-8 mx-auto w-full grow')

			timeline(
				:ui='ui.timeline'
				:items='data'
				:style
				:pending
				content-key="description"
				badge-key="abbreviation"
				title-key="provider"
				subtitle-key="job"
				orientation='horizontal'
				data-allow-mismatch='style'
				class='motion-safe:-animate-slide-70 motion-safe:animate-timeline-view animate-direction-reverse animate-from-30  animate-to-80 animate-fill-both motion-safe:top-40 motion-safe:lg:top-60 motion-safe:sticky motion-safe:min-w-(--width)'
				alternate
				line-end
				reverse
				lazy
				)
</template>

<script lang="ts" setup>
type Props = {
	scaleDown?: boolean
}

const props = defineProps<Props>()

const { tc } = useTranslation()

const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${base}` : base
	}
})

const { data, pending } = useExperiences()

const style = computed(() => {
	const size = data.value?.length || 0
	const length = 24 * 2 * size

	return {
		'--width': `max(${length}rem, 200dvw)`
	}
})

const ui = {
	title: 'text-(--ui-bg) -mb-2 md:-mb-3 lg:-mb-4',
	container: {
		base: 'flex flex-col gap-16'
	},
	timeline: {
		divider: 'border',
		text: 'text-highlighted',
		badge: {
			base: 'text-toned bg-elevated ring ring-(--ui-border)'
		}
	}
}
</script>
