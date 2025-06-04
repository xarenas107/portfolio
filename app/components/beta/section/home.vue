<template lang="pug">
div(class='bg-gradient-to-b from-(--ui-primary)/10 to-(--ui-bg) max-w-full overflow-clip flex items-center min-h-svh')

	u-lazy(class='w-full min-h-svh lg:min-h-auto')
		u-container(v-bind='options' class="flex h-full w-full flex-col gap-4 overflow-visible py-16 pb-24 lg:py-32 relative")

			u-transition(delay='1s' before-enter-class="motion-safe:max-w-0" enter-class='max-w-full' duration='.75s' timing-function="ease-in-out")
				template(#default='{ state, ...props }')
					div(class='flex justify-center gap-4 transition-all duration-200')
						h6(class='font-display uppercase font-bold text-2xl max-w-prose sm:text-4xl lg:text-6xl leading-4 text-nowrap text-highlighted') {{ greetings }}
						u-separator(v-bind='props' color="primary")

			u-transition(delay='.5s' active-class='origin-bottom' before-enter-class="motion-safe:max-h-0" enter-class='max-h-48 sm:max-h-64 lg:max-h-full' duration='.5s' timing-function="ease-in-out")
					template(#default='{ state, ...props }')
						span(v-bind='props' class='w-full h-full grow lg:hidden bg-primary rounded-(--ui-radius)')

							u-transition(delay='1.65s' before-enter-class="motion-safe:rotate-x-90" active-class="origin-bottom" duration='.5s' timing-function="ease-in-out")
								template(#default='{ state, ...props }')
									beta-hero-image(v-bind='props' class='lg:order-1')

			div(class='flex flex-col gap-x-4 lg:gap-8 grow w-full')
				div(class="font-display uppercase font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl text-highlighted")
					u-transition(delay='1s' before-enter-class="motion-safe:max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-in-out")
						template(#default='{ state, ...props }')
							div(class='flex place-content-center place-items-center gap-x-3 transition-all duration-200' :class='[state.idle ? "sm:gap-x-3" : "sm:gap-x-4 md:gap-x-4"]')
								h1 {{  t('im') }}
								h1(class='lg:order-1') {{ data?.name }},

								span(v-bind='props' class='h-font grow bg-primary rounded-(--ui-radius)')

									u-transition(delay='1.5s' before-enter-class="scale-y-0" duration='.5s' timing-function="ease-in-out")
										template(#default='{ state, ...props }')
											beta-hero-image(v-bind='props' class='lg:order-1 hidden lg:flex origin-bottom')

					u-transition(delay='1s' before-enter-class="motion-safe:max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-in-out")
						template(#default='{ state, ...props }')
							div(class='flex flex-wrap sm:flex-nowrap place-content-center gap-x-3 sm:gap-x-4 md:gap-x-6 hyphens-auto place-items-center transition-all duration-200')
								div(v-for='word, index in data?.job?.split(" ")' class='flex place-content-center place-items-center text-nowrap w-full gap-x-3 sm:gap-x-4 md:gap-x-6 sm:w-auto')
									h1 {{ word }}
									span(v-bind='props' class='grow lg:-order-1 h-font sm:hidden bg-primary rounded-(--ui-radius)')

								span(v-bind='props' class='hidden sm:block shrink grow bg-primary rounded-(--ui-radius) lg:-order-1 h-font')

			u-transition(delay='.25s' before-enter-class="motion-safe:opacity-0 motion-safe:translate-y-10" duration='.5s' timing-function="ease-out")
				template(#default='{ state, ...props }')
					div(class='flex flex-col md:flex-row gap-6 justify-center')
						p(v-bind='props' class='text-base text-default text-balance max-w-sm lg:max-w-lg delay-[1s] md:delay-0 h-fit') {{ data?.description }}

						u-transition(delay='1s' before-enter-class="motion-safe:max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-in-out")
							template(#default='{ state, ...props }')
								span(v-bind='props' class='hidden md:inline-block grow')

						//- Contacts
						div(v-bind='props' class='flex gap-y-3 gap-x-6 flex-col max-w-sm delay-[1.2s] md:delay-0')
							div(class='flex gap-y-3 gap-x-6 flex-wrap')
								u-link-action(v-for='item in data?.portfolio' v-bind='item' class='focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2')
								u-link-action(v-for='item, key in data?.contact' v-bind='item' :key class='focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2')
								u-link-action(:title='data?.location' icon='i-material-symbols:location-on-outline')

			div(class='w-full bottom-0 absolute left-0 items-center justify-center flex')
				u-button(@click='navigate("#studies")' variant='link' :aria-label='t("go.next")' color='neutral' class='rounded-full cursor-pointer')
					u-icon(name='i-heroicons:arrow-small-down-solid' class="w-8 h-8 motion-safe:animate-bounce")
</template>

<script lang="ts" setup>
type Props = {
	scaleDown?: boolean
}

const props = defineProps<Props>()

const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${base}` : base
	}
})

const { t } = useI18n()

const transition = {
	name: 'transition-fade'
}

const navigate = (value: `#${string}`) => {
	const element = document.querySelector(value)
	element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const greetings = useGreetings()
const show = shallowRef(false)
onMounted(() => show.value = true)

const { data } = useUser()
</script>

<style lang="scss" scoped>
@keyframes scale-up {
	to {
		transform: translateY(50%);
	}
}

@keyframes reveal {

	from,
	5% {
		transform: translateY(-200%);
	}

	50%,
	55% {
		transform: translateY(-100%);
	}

	95%,
	to {
		transform: translateY(0%);
	}
}

@media (prefers-reduced-motion: no-preference) {
	.parallax-exit-animation {
		animation: scale-up ease-out forwards;
		animation-timeline: view();
		animation-range: exit;
	}

	.reveal-animation {
		animation: reveal 5s cubic-bezier(.9, .01, .01, .9) infinite;
	}
}

.h-font {
	height: .75em;
}

.rotate-x-90 {
	transform: rotateX(-90deg) perspective(550px);
	transform-style: preserve-3d;
}
</style>
