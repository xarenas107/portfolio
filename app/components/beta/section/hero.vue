<template lang="pug">
div(class='bg-primary-100/20 dark:bg-primary-900/20 max-w-full overflow-clip flex items-center min-h-svh')
	u-lazy(class='w-full')
		u-container(class="flex h-full w-full flex-col gap-4 overflow-visible py-32 relative")
			//- bg-gradient(class='fixed top-0 left-0 w-full h-full mix-blend-multiply dark:mix-blend-screen opacity-80')

			u-transition(delay='1s' before-enter-class="max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-in-out")
				template(#default='{ state, ...props }')
					div(class='flex justify-center gap-4 transition-all duration-200')
						h6(:class='ui.text.base' class='font-display uppercase font-bold text-2xl max-w-prose sm:text-4xl lg:text-6xl leading-4 text-nowrap') {{ t('greetings.hi') }}
						u-divider(v-bind='props' :ui='ui.divider' size='md')

			//- u-transition(delay='.5s' before-enter-class="scale-y-0" active-class="origin-bottom" duration='.5s')
			//- 	template(#default='props')
			//- 		beta-hero-image(v-bind='props' class='lg:order-1 lg:hidden flex')

			u-transition(delay='.5s' active-class='origin-bottom' before-enter-class="max-h-0" enter-class='max-h-48' duration='.5s' timing-function="ease-in-out")
					template(#default='{ state, ...props }')
						span(v-bind='props' class='w-full h-full bg-primary-500 dark:bg-primary-600 grow lg:hidden')

							u-transition(delay='1.5s' before-enter-class="rotate-x-90" active-class="origin-bottom" duration='.5s' timing-function="ease-out")
								template(#default='{ state, ...props }')
									beta-hero-image(v-bind='props' class='lg:order-1')

			//- img(src='/api/favicon')
			//- div(class='flex flex-col gap-8 items-start grow z-20 basis-3/4')
				//- u-lazy(:delay='500' :transition class='grow flex w-full')
			div(class='flex flex-col gap-4 lg:gap-8 grow w-full')
				div(:class='ui.text.base' class="font-display uppercase font-bold text-6xl sm:text-8xl md:text-9xl lg:text-10xl xl:text-10xl")
					h1(class='flex flex-wrap place-content-center place-items-center gap-x-4 sm:gap-x-6 transition-all duration-200') {{  t('im') }}
						span(class='lg:order-1') {{ user.data?.name }},

						u-transition(delay='1s' before-enter-class="max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-in-out")
							template(#default='{ state, ...props }')
								span(v-bind='props' class='bg-primary-500 dark:bg-primary-600 h-font grow')

									u-transition(delay='1.75s' before-enter-class="scale-y-0" duration='.5s' timing-function="ease-in-out")
										template(#default='{ state, ...props }')
											beta-hero-image(v-bind='props' class='lg:order-1 hidden lg:flex origin-bottom')

					h1(class='flex place-content-center gap-x-4 sm:gap-x-6 hyphens-auto place-items-center') {{ user.data?.job }}
						u-transition(delay='1s' before-enter-class="max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-in-out")
							template(#default='{ state, ...props }')
								span(v-bind='props' class='shrink grow lg:bg-primary-500 dark:lg:bg-primary-600 lg:-order-1 h-font')
								//- span(v-bind='props' class='grow lg:hidden h-font')

			u-transition(delay='.25s' before-enter-class="opacity-0 translate-y-10" duration='.5s' timing-function="ease-out")
				template(#default='{ state, ...props }')
					div(class='flex flex-col md:flex-row gap-6 justify-center')
						p(v-bind='props' :class='ui.text.base' class='text-base text-slate-700 dark:text-slate-200 text-balance max-w-sm lg:max-w-lg delay-[1s] sm:delay-0') {{ user.data?.description }}

						u-transition(delay='1s' before-enter-class="max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-in-out")
							template(#default='{ state, ...props }')
								span(v-bind='props' class='hidden lg:inline-block grow')

						//- u-lazy(:transition class='max-w-sm')
						div(v-bind='props' class='flex gap-y-3 gap-x-6 flex-col max-w-sm delay-[1.2s] sm:delay-0')
							div(class='flex gap-y-3 gap-x-6 flex-wrap')
								u-link-action(v-for='item in user.data?.portfolio' v-bind='item')

								u-link-action(v-for='item, key in user.data?.contact' v-bind='item' :key)

								u-link-action(:title='user.data?.location' icon='i-material-symbols:location-on-outline')
</template>

<script lang="ts" setup>
const { t } = useI18n()

const transition = {
	name: 'transition-fade'
}

const greetings = useGreetings()
const show = shallowRef(false)
onMounted(() => show.value = true)

const user = useUser()

const ui = {
	text: {
		base: 'text-slate-900 dark:text-slate-100'
	},
	divider: {
		border: {
			base: 'border-primary-200 dark:border-primary-800'
		}
	}
}
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
