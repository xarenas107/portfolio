<template lang="pug">
div(class='overflow-clip min-h-svh flex flex-col relative')
	div(class='h-[20svh] w-full bg-gradient-to-b from-(--ui-primary)/10 to-(--ui-bg)')

	div(class='w-full bg-primary overflow-clip')
		u-container(v-bind='options' class='overflow-clip')
			section-title(class="text-(--ui-bg) -mt-1 md:-mt-2 scroll-slide-animation" hyphens) {{ t('section.studies') }}

	div(class='flex flex-col w-full h-full py-24 grow bg-primary')
		div(v-bind='options' class='px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl mx-auto w-full motion-reduce:pb-24 grow ')

			//- client-only
			//- 	template(#fallback)
			//- 		u-timeline(:ui='ui.timeline' pending)

			u-timeline(
				:orientation
				:ui='ui.timeline'
				:alternate='!mobile || md'
				:reverse='!mobile || md'
				:items='data'
				:pending
				class='scroll-slide-reverse-animation'
				subtitle-key='provider'
				badge-key='type'
				time-key='startAt'
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

const { mobile, md } = useDisplay()

const orientation = computed(() => mobile.value ? 'vertical' : 'horizontal')
const { data, pending } = useStudies()

const ui = {
	timeline: {
		base: 'lg:min-w-[100dvw]',
		divider: 'border-inverted/20',
		dot: {
			base: 'bg-inverted'
		},
		text: 'text-highlighted',
		badge: {
			base: 'text-highlighted ring ring-(--ui-text-default)'
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
    animation-range: 0svh 80svh;
  }

  .scroll-slide-reverse-animation {
    animation: slide-from-end ease-in-out both;
    animation-timeline: view();
    animation-range: 0svh 60svh;
  }
}
</style>
