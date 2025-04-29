<template lang="pug">
div(class='py-24 min-h-svh bg-(--ui-primary) relative overflow-clip place-content-center')
  u-container(v-bind='options' class='flex flex-col gap-16')
    section-title(:class='ui.title' class="scroll-fade-animation z-40" hyphens) {{ data?.title }}

    u-infinite-slider(:items='data?.items' ref='infinite-slider' class='flex gap-4')
      template(#default='props')
        u-card-group(v-bind='props' :ui='ui.card' color='primary' class='z-20 motion-reduce:px-4 motion-reduce:sm:px-6 motion-reduce:lg:px-8')
          template(#item='{ item, props }')
            u-card(v-bind='props' class='flex h-full flex-col justify-between cursor-default w-80 max-w-fit snap-center' as='li' variant='solid')
              template(#header)
                div(class='flex flex-col gap-4 justify-between')
                  div(class='flex flex-col gap-2 justify-between items-start')
                    h5(class='font-extrabold text-lg') {{ item?.title }}
                    span(class=' text-xs text-nowrap') {{ item?.provider }}

                  div(class='flex gap-2 group flex-wrap')
                    u-link(v-for='to, index in item.credentials' :to)
                      u-badge(:ui='ui.badge' size='md' variant='outline') {{ index ? `No. ${ index + 1 }` : "Credential" }}
                        u-icon(name='i-heroicons-outline:external-link' class='w-4 h-4')

              template(#footer)
                div(class='flex gap-2 text-primary-100 dark:text-primary-50/80 items-center')
                  u-icon(name='heroicons-outline:clock' class='w-5 h-5')
                  time(class='uppercase text-xs') {{ item.time  }}


              nuxt-img(v-if='item.image' :src='item.image' :alt='item.provider' class='-z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 w-[10rem] rounded-lg overflow-clip pointer-events-none invert')
</template>

<script lang="ts" setup>
type Content = {
	title: string
	items: {
		image?: string
		title: string
		credentials: string[]
		provider: string
		time: string
		endAt: string
		class?: string
	}[]
}

type Props = {
	scaleDown?: boolean
}
const props = defineProps<Props>()

const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${ base }` : base
	}
})

const { data, status } = useFetchContent<Content>('section/certificates', {
	default: () => ({
		title: '',
		items: []
	})
})

const ui = {
	title: 'text-primary-100 dark:text-primary-50',
	card: {
    border: 'px',
		base: 'bg-primary-400 dark:bg-primary-300 p-px',
		child: 'bg-(--ui-primary) text-primary-100 dark:text-primary-50',
		before: `before:bg-primary-200 dark:before:bg-primary-100`,
		after: `after:bg-primary-200 dark:after:bg-primary-100`
	},
	badge: {
    base: `w-fit h-fit text-nowrap gap-2 ring-1 ring-inset text-primary-200 hover:text-primary-100 dark:text-primary-200 dark:hover:text-primary-100 ring-primary-200 hover:ring-primary-100  dark:ring-primary-200 dark:hover:ring-primary-100`
	}
}
</script>

<style lang="scss" scoped>
@keyframes fade {
  from {
    transform: translateY(40svh);
    // -webkit-text-stroke-width: 1px;
    color: transparent;
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    // -webkit-text-stroke-width: 2px;
    color: transparent;
    opacity: 1;
  }
}

@keyframes rotate-3d {
  from {
    color: transparent;
    transform: rotate3d(1,0,0, -5deg) translate(-50%,-100%) scale(4) perspective(550px);
  }

  80% {
    transform: scale(1);
  }
}

@keyframes slide-from-end {
  from {
    transform: translate(-100%);
  }
  to {
    transform: translate(100dvw);
  }
}

@keyframes scale-down {
  from {
    color: var(--ui-color-primary-600);
    transform: translate(-50dvw) scale(3);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-fade-animation {
    transform-origin: left top;
    transform-style: preserve-3d;
    animation: rotate-3d ease-out both;
    animation-timeline: view();
    animation-range: -40svh 80svh;
  }
  .scroll-slide-animation {
    animation: slide-from-end linear both;
    animation-timeline: view();
    animation-range: 20svh 100svh;
  }
  .scale-down-animation {
    transform-origin: left top;
    animation: scale-down ease-in forwards;
    animation-timeline: view();
    animation-range: entry;
  }
}
</style>
