<template lang="pug">
div(class='overflow-clip min-h-svh flex flex-col relative')
	div(class='h-[20svh] w-full bg-gradient-to-b from-primary-100/20 to-(--ui-bg) dark:from-primary-900/20')

	div(class='w-full bg-(--ui-primary) overflow-clip')
		u-container(class='overflow-clip')
			section-title(class="text-(--ui-bg) -mt-1 md:-mt-2 scroll-slide-animation" hyphens) {{ data?.title }}

	div(class='flex flex-col w-full h-full py-24 grow bg-(--ui-primary) ')
		div(class='px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl mx-auto w-full motion-reduce:pb-24 grow')

			client-only
				template(#fallback)
					u-timeline(:ui='ui.timeline' pending)

				u-timeline(:orientation :ui='ui.timeline' :alternate='!mobile || md' :reverse='!mobile || md' :items='data?.items' :pending class='scroll-slide-reverse-animation')
</template>

<script lang="ts" setup>
type Content = {
	title: string
	items: {
		title: string
		subtitle: string
		badge: string
		time: string
		active?: boolean
		startAt: string
	}[]
}

const { mobile, md } = useDisplay()
const getTime = (value: string) => new Date(value).getTime()

const orientation = computed(() => mobile.value ? 'vertical' : 'horizontal')
const { data, status } = useFetchContent<Content>('section/studies', {
	callback: (data) => {
		data.items.sort((a, b) => getTime(b.startAt) - getTime(a.startAt))
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
	timeline: {
		base: 'lg:min-w-[100dvw]',
		divider: 'border-primary-300 dark:border-primary-200',
		dot: {
			base: 'bg-primary-100 dark:bg-primary-200'
		},
		badge: {
			base: 'text-primary-100 dark:text-primary-50 bg-primary-400/20 dark:bg-primary-300/20 ring ring-primary-100/25 dark:ring-primary-50/25',
		},
		// text: 'text-primary-100 dark:text-primary-200'
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
