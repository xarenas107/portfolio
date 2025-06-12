<template lang="pug">
div(class='overflow-clip min-h-screen flex flex-col relative')
	div(class='h-80 w-full bg-default flex items-end')
		div(class='w-full bg-primary overflow-clip')
			u-container(v-bind='options' class='overflow-clip origin-top')
				section-title(class="text-(--ui-bg) -mt-1 md:-mt-2 scroll-slide-animation" hyphens) {{ t('section.studies') }}

	div(class='flex flex-col w-full h-full py-24 grow bg-primary')
		div(v-bind='options' class='px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl mx-auto w-full motion-reduce:pb-24 grow ')

			u-timeline(
				:orientation
				:ui='ui.timeline'
				:alternate='!mobile '
				:items='data'
				:pending
				class='scroll-slide-reverse-animation'
				subtitle-key='provider'
				badge-key='type'
				time-key='startAt'
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
const { t } = useI18n()

const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${base}` : base
	}
})

const { mobile } = useDisplay()

const orientation = computed(() => mobile.value ? 'vertical' : 'horizontal')
const { data, pending } = useStudies()

const ui = {
	timeline: {
		base: 'lg:min-w-[100dvw]',
		divider: 'border-default/20',
		dot: {
			base: 'bg-default'
		},
		text: 'text-inverted',
		badge: {
			base: 'text-inverted ring ring-(--ui-text-default)'
		}
	}
}
</script>

<style lang="scss" scoped>
@keyframes slide-from-start {
  from {
    transform: translateY(-100%);
  }
}

@keyframes slide-from-end {
  from {
    opacity: 0;
    transform: translateY(80%);
  }
  to {
    transform: translateY(0%);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-slide-animation {
    animation: slide-from-start ease-in-out forwards;
    animation-timeline: view();
    animation-range: 0% 80%;
  }

  .scroll-slide-reverse-animation {
    animation: slide-from-end ease-in-out both;
    animation-timeline: view();
    animation-range: 0% 40%;
  }
}
</style>
