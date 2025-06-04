<template lang="pug">
div(class='overflow-clip bg-(--ui-primary) relative flex motion-safe:min-h-screen flex-col')
	div(class='h-64 w-full bg-(--ui-primary) flex ')
		u-container(v-bind='options' class='h-full w-full origin-bottom items-end flex')
			section-title(:class='ui.title' class="scroll-slide-animation" hyphens) {{  t('section.experience', 2) }}

	div(class='relative flex w-full bg-default h-full motion-safe:min-h-[150vh] py-24 grow motion-reduce:overflow-auto scroll-hidden')
		div(v-bind='options' class='px-4 sm:px-6 motion-reduce:pr-0 motion-reduce:sm:pr-0 motion-reduce:lg:pr-0 lg:px-8 gap-8 motion-reduce:max-w-7xl mx-auto w-full grow ')

			u-timeline(
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
				class='scroll-slide-animation-reverse motion-safe:top-48 motion-safe:sticky motion-safe:min-w-(--width)'
				alternate
				reverse
				lazy
				)
</template>

<script lang="ts" setup>
type Props = {
	scaleDown?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()

const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${base}` : base
	}
})

const { data, pending } = useExperiences()

const style = computed(() => {
	const size = data.value?.length || 0
	const length = 25 * (8 + size)

	return {
		'--width': `${length}rem`
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

<style lang="scss" scoped>
@keyframes slide-from-start {
  from {
    transform: translateY(100%);
  }
}

@keyframes slide-from-end {
  from {
    transform: translate(80%);
  }
  to {
    transform: translate(-45%);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-slide-animation {
    animation: slide-from-start ease-in-out both;
    animation-timeline: view();
    animation-range: 0% 60%;
  }

  .scroll-slide-animation-reverse {
	animation: slide-from-end cubic-bezier(.12,.48,.72,1) both;
    animation-timeline: view();
    animation-range: 0% 80%;
  }
}
</style>
