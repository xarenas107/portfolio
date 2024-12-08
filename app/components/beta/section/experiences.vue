<template lang="pug">
div(class='overflow-clip bg-primary-500 dark:bg-primary-600 relative flex motion-safe:min-h-svh flex-col')
	div(class='h-[20svh] w-full bg-primary-500 dark:bg-primary-600')
	u-container(:ui='ui.container' class='h-full w-full')
		section-title(:class='ui.title' class="scroll-slide-animation" hyphens) {{  data?.title }}

	div(class='relative flex w-full bg-slate-100 dark:bg-slate-950 h-full motion-safe:min-h-[150svh] py-24 grow motion-reduce:overflow-auto scroll-hidden')
		//- div(class='px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl mx-auto w-full motion-reduce:overflow-auto grow scroll-hidden')
		div(class='px-4 sm:px-6 motion-reduce:pr-0 motion-reduce:sm:pr-0 motion-reduce:lg:pr-0 lg:px-8 gap-8 motion-reduce:max-w-7xl mx-auto w-full grow')
			u-timeline(:ui='ui.timeline' alternate reverse :items='data?.items' :pending orientation='horizontal' data-allow-mismatch='class' class='scroll-slide-animation-reverse motion-safe:top-[30svh] motion-safe:sticky motion-safe:min-w-[var(--width)]' :style='`--width: ${width}rem`')
		//- u-divider(class='motion-safe:hidden shrink w-96 absolute right-0 top-[50%] -translate-y-[50%]')
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

const getTime = (value: string) => new Date(value).getTime()

const { data, status } = useFetchContent<Content>('section/experiences', {
	callback: (data) => {
		data.items.sort((a, b) => getTime(b.startAt) - getTime(a.startAt))
		return data
	},
	default: () => ({
		title: '',
		items: []
	})
})

const width = computed(() => {
	const size = data.value?.items.length || 0
	const length = 25 * (8 + size)
	return length
})
const { pending } = useStatus(status)

const ui = {
	title: 'text-slate-100 dark:text-slate-950 -mb-2 md:-mb-6 lg:-mb-8',
	container: {
		base: 'flex flex-col gap-16'
	},
	timeline: {
		divider: 'border-slate-700 dark:border-slate-300',
		text: 'text-slate-900 dark:text-slate-100'
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
