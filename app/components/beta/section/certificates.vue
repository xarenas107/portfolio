<template lang="pug">
div(class='py-24 min-h-screen bg-primary relative overflow-clip place-content-center')
  u-container(v-bind='options' class='flex flex-col gap-16')
    section-title(:class='ui.title' class="origin-top-left motion-safe:animate-timeline-view motion-safe:animate-name-[slide-y,fade-in] z-20" data-cursor="true" hyphens) {{ t('section.certificates') }}

    div(class='flex flex-col gap-8' )
      u-card-group(:ui='ui.card' color='primary' class='z-10' )
        template(#default='{ childClass, containerClass }')
          u-carousel(v-if='data?.length' @select='control.select' v-slot="{ item }" :items='data' :ui="ui.carousel" :auto-scroll='play' :start-index='1' class='min-w-dvw left-1/2 -translate-x-1/2' align='start' ref="carousel" loop)
            div(:class='containerClass' class='h-80 ml-4 sm:ml-6 lg:ml-8')
              u-card(:class='childClass' class='flex h-full w-full flex-col justify-between cursor-default min-w-fit snap-center' as='li' variant='solid')
                template(#header)
                  div(class='flex flex-col gap-4 justify-between')
                    div(class='flex flex-col gap-2 justify-between items-start')
                      h4(class='font-extrabold text-lg') {{ item?.title }}
                      span(class=' text-xs text-nowrap') {{ item?.provider }}

                    div(class='flex gap-2 group flex-wrap')
                      u-button(v-for='to, index in item.credentials' :href="to" :ui='ui.badge' trailing-icon="i-heroicons-outline:external-link" size='md' variant='solid' ) {{ index ? t('credential.no', { number: index + 1 }) : t('credential.name') }}

                template(#footer)
                  div(v-if='item.endAt' class='flex gap-2 text-inverted/80 items-center')
                    u-icon(name='heroicons-outline:clock' class='w-5 h-5')
                    nuxt-time(:datetime="item.endAt" :locale class='uppercase text-xs' month='long' year='numeric')

                nuxt-picture(v-if='item.image' :src='item.image' :alt='item.provider' :img-attrs class='-z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 w-[10rem] rounded-lg overflow-clip pointer-events-none light:invert')

      div(class='flex gap-2 items-center')
        u-button(@click='control.prev' icon='i-line-md:chevron-left' :aria-label='t("control.prev")' variant='outline' color='neutral' size="xl" :class='ui.button')

        u-button(@click='toggle()' :icon :aria-label='t("control.play")' variant='solid' color='neutral' size="xl" class='bg-default hover:bg-accented text-primary ring-default aspect-square place-content-center rounded-full motion-reduce:hidden cursor-pointer focus-visible:outline-default focus-visible:outline-2 focus-visible:outline-offset-2')

        u-button(@click='control.next' icon='i-line-md:chevron-right' :aria-label='t("control.next")' variant='outline' color='neutral' size="xl" :class='ui.button')
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

const [play, toggle] = useToggle(!reduce.value)
const icon = computed(() => !play.value ? 'i-line-md:play' : 'i-line-md:pause')

watchThrottled(reduce, (value) => {
	if (value) toggle(false)
}, { throttle: 100 })

const carousel = useTemplateRef('carousel')
const index = shallowRef(0)

const control = {
	select: (value: number) => { index.value = value },
	to: (value: number) => {
		carousel.value?.emblaApi?.scrollTo(value)
	},
	next: () => { control.to(index.value + 1) },
	prev: () => { control.to(index.value - 1) }
}

const imgAttrs = {
	class: 'w-full h-full object-cover',
	width: '160',
	height: '160'
}

const ui = {
	title: 'text-inverted',
	card: {
		base: 'bg-default/20 group-hover:from-(--ui-bg)/50',
		child: 'bg-primary/80 text-inverted'
	},
	badge: {
		base: `outline outline-default focus-visible:rounded focus-visible:outline-2 focus-visible:outline-default focus-visible:outline-offset-0`
	},
	carousel: {
		item: 'w-full max-w-80'
	},
	button: 'text-inverted bg-default/10 ring-default/20 hover:bg-default/20 aspect-square place-content-center rounded-full cursor-pointer focus-visible:bg-default/20 focus:focus-visible:ring-offset-primary focus:focus-visible:ring-2 focus-visible:ring-default focus-visible:outline-primary'
}
</script>

<style lang="scss" scoped>
</style>
