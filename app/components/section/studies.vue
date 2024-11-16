<template lang="pug">
div(class='overflow-clip min-h-dvh flex flex-col relative')
	div(class='h-[20dvh] w-full bg-primary-100/20 dark:bg-primary-900/20')

	div(class='w-full bg-primary-500 dark:bg-primary-600')
		u-container(:ui='ui.container' class='h-full w-full overflow-clip')
			section-title(:class='ui.title' class="scroll-slide-animation" hyphens) {{  data?.title }}

	div(class='flex flex-col w-full h-full py-24 grow bg-primary-500 dark:bg-primary-600 ')
		div(class='px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl mx-auto w-full motion-reduce:pb-24 motion-reduce:overflow-auto grow')

			client-only
				template(#fallback)
					//- class='animate-pulse'
					u-timeline(:ui='ui.timeline' pending)

				u-timeline(:orientation :ui='ui.timeline' :alternate='!mobile || md ' :reverse='!mobile || md' :items='data?.items' :pending class='scroll-slide-reverse-animation')
</template>

<script lang="ts" setup>
type Content = {
	title: string
	items: {
		title: string
		subtitle: string
		badge: string
		time: string
		highlight?: boolean
		startAt: string
	}[]
}

const { mobile, md } = useDisplay()
const getTime = (value: string) => new Date(value).getTime()

const orientation = computed(() => mobile.value ? 'vertical' : 'horizontal')
const { data, status } = useFetchContent<Content>('section/studies', {
	callback: (data) => {
		data.items.sort((a, b) => getTime(b.startAt) - getTime(a.startAt))

		const first = data.items[0]
		if (first) first.highlight = true
		return data
	},
	pick: ['title', 'items'],
	default: () => ({
		title: '',
		items: []
	})
})

const { pending } = useStatus(status)

const ui = {
	title: 'text-slate-50/95 dark:text-slate-900/90 -mt-2 sm:-mt-4 md:-mt-4 lg:-mt-6 xl:-mt-8',
	container: {
		base: 'flex flex-col gap-16'
		// padding: 'px-4 sm:px-6 lg:px-8 lg:pr-0',
		// constrained: "max-w-full"
	},
	timeline: {
		base: 'lg:min-w-[100dvw]',
		divider: 'border-slate-100 dark:border-slate-300',
		dot: {
			base: 'bg-slate-100 dark:bg-slate-300'
		},
		text: 'text-primary-100 dark:text-primary-100'
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
    animation-range: 0dvh 80dvh;
  }

  .scroll-slide-reverse-animation {
    animation: slide-from-end ease-in-out both;
    animation-timeline: view();
    animation-range: 0dvh 60dvh;
  }
}
</style>
