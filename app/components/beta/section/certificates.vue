<template lang="pug">
div(class='py-24 min-h-svh bg-primary relative overflow-clip place-content-center')
  u-container(v-bind='options' class='flex flex-col gap-16')
    section-title(:class='ui.title' class="scroll-fade-animation z-40" hyphens) {{ t('section.certificates') }}

    div(class='flex flex-col gap-8')
      //- u-infinite-slider(:stop='!play' :items='data' ref='infinite-slider' class='flex gap-4')
        template(#default='props')
          u-card-group(v-bind='props' :ui='ui.card' color='primary' class='z-20')
            template(#item='{ item, props, index }')
              u-card(v-bind='props' class='flex h-full flex-col justify-between cursor-default w-80 min-w-fit snap-center' as='li' variant='solid')
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
                  div(v-if='item.endAt' class='flex gap-2 text-default/80 items-center')
                    u-icon(name='heroicons-outline:clock' class='w-5 h-5')
                    nuxt-time(:datetime="item.endAt" :locale class='uppercase text-xs' month='long' year='numeric')

                nuxt-img(v-if='item.image' :src='item.image' :alt='item.provider' class='-z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 w-[10rem] rounded-lg overflow-clip pointer-events-none invert')

      u-card-group(:ui='ui.card' color='primary' class='z-20')
        template(#default='{ childClass, containerClass }')
          u-carousel(v-if='data?.length' @select='control.select' v-slot="{ item }" :items='data' :ui="ui.carousel" :auto-scroll='play' :start-index='1' class='min-w-dvw left-1/2 -translate-x-1/2' align='start' ref="carousel" loop)
            div(:class='containerClass' class='h-80 ml-4 sm:ml-6 lg:ml-8')
              u-card(:class='childClass' class='flex h-full w-full flex-col justify-between cursor-default min-w-fit snap-center' as='li' variant='solid')
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
                  div(v-if='item.endAt' class='flex gap-2 text-inverted/80 items-center')
                    u-icon(name='heroicons-outline:clock' class='w-5 h-5')
                    nuxt-time(:datetime="item.endAt" :locale class='uppercase text-xs' month='long' year='numeric')

                nuxt-img(v-if='item.image' :src='item.image' :alt='item.provider' class='-z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 w-[10rem] rounded-lg overflow-clip pointer-events-none invert')

      div(class='flex gap-2 items-center')
        u-button(@click='control.prev' icon='i-line-md:chevron-left' :aria-label='t("control.prev")' variant='outline' color='neutral' size="xl" :class='ui.button')

        u-button(@click='toggle()' :icon :aria-label='t("control.play")' variant='solid' color='neutral' size="xl" class='bg-default hover:bg-accented text-primary ring-default aspect-square place-content-center rounded-full motion-reduce:hidden cursor-pointer')

        u-button(@click='control.next' icon='i-line-md:chevron-right' :aria-label='t("control.prev")' variant='outline' color='neutral' size="xl" :class='ui.button')
</template>

<script lang="ts" setup>
type Props = {
	scaleDown?: boolean
}
const props = defineProps<Props>()
const motion = usePreferredReducedMotion()
const reduce = computed(() => motion.value === 'reduce')

const { t, locale } = useI18n()
const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${base}` : base
	}
})

const { data } = useCertificates()

const ui = {
	title: 'text-inverted',
	card: {
		border: 'px',
		base: 'bg-default/20 p-px',
		child: 'bg-primary text-inverted',
		before: `before:bg-default`,
		after: `after:bg-default`
	},
	badge: {
		base: `w-fit h-fit text-nowrap gap-2 ring-1 ring-inset text-inverted/80 hover:text-inverted ring-default/50 hover:ring-default bg-primary`
	},
	carousel: {
		item: 'w-full max-w-80'
	},
	button: 'text-inverted bg-default/10 ring-default/20 hover:bg-default/20 aspect-square place-content-center rounded-full cursor-pointer'
}

const [play, toggle] = useToggle(!reduce.value)
const icon = computed(() => !play.value ? 'i-line-md:play' : 'i-line-md:pause')

watchThrottled(reduce, (value) => {
	if (value) play.value = false
}, { throttle: 100 })

const carousel = useTemplateRef('carousel')
const index = shallowRef(0)

const control = {
	select: (value: number) => { index.value = value },
	to: (value: number) => {
		control.select(value)
		carousel.value?.emblaApi?.scrollTo(value)
	},
	next: () => { control.to(index.value + 1) },
	prev: () => { control.to(index.value - 1) }
}
</script>

<style lang="scss" scoped>
@keyframes fade {
  from {
    transform: translateY(40svh);
    color: transparent;
    opacity: 0;
  }
  50% {
    transform: translateY(0);
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
