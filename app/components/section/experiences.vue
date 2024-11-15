<template lang="pug">
div(class='overflow-clip bg-primary-500 dark:bg-primary-600 relative flex min-h-dvh flex-col')
  div(class='h-[20dvh] w-full bg-primary-500 dark:bg-primary-600')
  u-container(:ui='ui.container' class='h-full w-full')
    section-title(:class='ui.title' class="scroll-slide-animation" hyphens) {{  data?.title }}

  div(class='flex flex-col w-full bg-slate-100 dark:bg-slate-900 h-full min-h-dvh py-24 grow')
    div(class='px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl mx-auto w-full motion-reduce:pb-24 motion-reduce:overflow-auto grow')
      u-timeline(:ui='ui.timeline' alternate reverse :items='data?.items' :pending orientation='horizontal' data-allow-mismatch='class' class='scroll-slide-animation-reverse w-dynamic motion-safe:min-w-[300dvw]')
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
	const length = 25 * (2 * size)
	return `${length}rem`
})
const { pending } = useStatus(status)

const ui = {
	title: 'text-slate-100 dark:text-slate-900 -mb-2 sm:-mb-4 md:-mb-4 lg:-mb-6 xl:-mb-6',
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
    transform: translate(-60%);
    position: sticky;
    top: 20dvh;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-slide-animation {
    animation: slide-from-start ease-in-out both;
    animation-timeline: view();
    animation-range: 0dvh 80dvh;
  }

  .scroll-slide-animation-reverse {
    animation: slide-from-end cubic-bezier(.73,.8,.4,1) both;
    animation-timeline: view();
    animation-range: 0dvh 160dvh;
  }
}

.w-dynamic {
  width: v-bind(width)
}
</style>
