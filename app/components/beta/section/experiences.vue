<template lang="pug">
div(class='overflow-clip bg-(--ui-primary) relative flex motion-safe:min-h-svh flex-col')
	div(class='h-[20svh] w-full bg-(--ui-primary)')
	u-container(v-bind='options' class='h-full w-full')
		section-title(:class='ui.title' class="scroll-slide-animation" hyphens) {{  t('section.experience', 2) }}

	div(class='relative flex w-full bg-default h-full motion-safe:min-h-[150svh] py-24 grow motion-reduce:overflow-auto scroll-hidden')
		div(v-bind='options' class='px-4 sm:px-6 motion-reduce:pr-0 motion-reduce:sm:pr-0 motion-reduce:lg:pr-0 lg:px-8 gap-8 motion-reduce:max-w-7xl mx-auto w-full grow')
			u-timeline(
				:ui='ui.timeline'
				:items='data'
				:pending
				content-key="description"
				badge-key="abbreviation"
				title-key="provider"
				subtitle-key="job"
				orientation='horizontal'
				data-allow-mismatch='class'
				class='scroll-slide-animation-reverse motion-safe:top-[30svh] motion-safe:sticky motion-safe:min-w-[var(--width)]'
				:style='`--width: ${width}rem`'
				alternate
				reverse
				lazy
				)
</template>

<script lang="ts" setup>
type Content = {
	title: string
	items: {
		title: string
		badge: string
		subtitle: string
		content: string
		time: string
		startAt: string
	}[]
}

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

const getTime = (value: string) => new Date(value).getTime()

const { data, pending } = useExperiences()

const width = computed(() => {
	const size = data.value?.length || 0
	const length = 25 * (8 + size)
	return length
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
			base: 'text-(--ui-primary) bg-(--ui-primary)/20'
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
    animation-range: 0svh 80svh;
  }

  .scroll-slide-animation-reverse {
	animation: slide-from-end cubic-bezier(.12,.48,.72,1) both;
    animation-timeline: view();
    animation-range: 0svh 180svh;
  }
}
</style>
