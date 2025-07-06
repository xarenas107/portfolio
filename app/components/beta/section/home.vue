<template lang="pug">
div(class='bg-gradient-to-b from-(--ui-primary)/10 to-(--ui-bg) max-w-full flex items-center min-h-dvh')

	u-lazy(delay='.5s' class='size-full' before-enter-class='opacity-0 translate-y-12' timing-function="ease-in-accelerate")
		u-container(v-bind='options' class="flex h-full w-full flex-col gap-4 pb-24 py-32 relative")

			u-transition(delay='.8s' before-enter-class="motion-safe:max-w-0" enter-class='max-w-full' duration='1.2s' timing-function="ease-in-accelerate")
				template(#default='{ state, ...props }')
					div(class='flex justify-center gap-4 transition-all duration-200')
						h6(class='font-display uppercase font-bold text-2xl max-w-prose sm:text-4xl lg:text-6xl leading-4 text-nowrap text-highlighted') {{ greetings }}
						u-separator(v-bind='props' color="primary")

			u-transition(delay='.5s' active-class='origin-bottom' before-enter-class="motion-safe:max-h-0" enter-class='max-h-48 sm:max-h-64 lg:max-h-full' duration='.5s' timing-function="ease-in-accelerate")
					template(#default='{ state, ...props }')
						span(v-bind='props' class='size-full relative grow lg:hidden bg-primary rounded-lg')
							u-transition(delay='1.2s' before-enter-class="motion-safe:opacity-0" active-class="origin-bottom" duration='.5s' timing-function="ease-in-accelerate")
								template(#default='{ state, ...props }')
									beta-hero-image(v-bind='props' :src='data.image' :img-attrs class='lg:order-1')

			div(:style='{ "--box-height": ".75em" }' class='flex flex-col gap-x-4 lg:gap-8 grow w-full')
				div(class="font-display uppercase font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl text-highlighted")
					u-transition(delay='.8s' active-class='origin-center' before-enter-class="motion-safe:max-w-0" enter-class='max-w-full' duration='1.2s' timing-function="ease-slow")
						template(#default='{ state, ...props }')
							div(class='flex place-content-center place-items-center gap-x-3 transition-all duration-200' :class='[state.idle ? "sm:gap-x-3" : "sm:gap-x-4 md:gap-x-4"]')
								h1 {{  t('im') }}
								h1(class='lg:order-1') {{ data?.name }},

								span(v-bind='props' class='h-(--box-height) grow bg-primary rounded-lg')

									u-transition(delay='1.4s' before-enter-class="motion-safe:opacity-0 motion-safe:drop-shadow-xs" duration='.5s' timing-function="ease-slow")
										template(#default='{ state, ...props }')
											beta-hero-image(v-bind='props' :src='data.image' :img-attrs class='lg:order-1 hidden lg:flex')

					u-transition(delay='.8s' before-enter-class="motion-safe:max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-slow")
						template(#default='{ state, ...props }')
							div(class='flex flex-wrap sm:flex-nowrap place-content-center gap-x-3 sm:gap-x-4 md:gap-x-6 hyphens-auto place-items-center transition-all duration-200')
								div(v-for='word, index in data?.job?.split(" ")' class='flex place-content-center place-items-center text-nowrap w-full gap-x-3 sm:gap-x-4 md:gap-x-6 sm:w-auto')
									h1(:data-cursor='index != 0' class='text-(--color)' :style='{ "--color": "var(--ui-text-higlighted)" }') {{ word }}
									span(v-bind='props' class='grow lg:-order-1 h-(--box-height) sm:hidden bg-primary rounded-lg')

								span(v-bind='props' class='relative hidden sm:flex shrink grow bg-primary rounded-lg lg:-order-1 h-(--box-height) ')
									//- u-comment(v-if='data.comment' :src='data.image' :name='data.fullname' :content='data.comment' :style='{ "--opacity": 0 }' class='normal-case font-sans font-normal ease-in transition-[scale,opacity] will-change-[scale,opacity] origin-bottom-left w-fit m-auto opacity-(--opacity) scale-(--opacity) hidden lg:flex')#comment

			u-transition(delay='.25s' before-enter-class="motion-safe:opacity-0 motion-safe:translate-y-10" duration='.5s' timing-function="ease-in-accelerate")
				template(#default='{ state, ...props }')
					div(class='flex flex-col md:flex-row gap-6 justify-center')
						p(v-bind='props' class='text-base text-default text-balance max-w-sm lg:max-w-lg delay-[1s] md:delay-0 h-fit') {{ data?.description }}

						u-transition(delay='.8s' before-enter-class="motion-safe:max-w-0" enter-class='max-w-full' duration='1s' timing-function="ease-slow")
							template(#default='{ state, ...props }')
								span(v-bind='props' class='hidden md:inline-block grow')

						//- Contacts
						div(v-bind='props' class='relative flex gap-6 flex-col max-w-sm delay-[1.2s] md:delay-0')
							div(class='flex gap-y-3 gap-x-6 flex-wrap')
								u-link-action(v-for='item in data?.portfolio' v-bind='item')
								u-link-action(v-for='item, key in data?.contact' v-bind='item' :key)
								u-link-action(:title='data?.location' icon='i-material-symbols:location-on-outline')

							u-comment(v-if='data.comment' :src='data.image' :name='data.fullname' :content='data.comment' class='normal-case font-sans font-normal flex max-w-prose size-full sm:w-fit')

			//- div(class='w-full bottom-0 absolute left-0 items-center justify-center flex flex-col')
				u-button(@click='navigate("#studies")' variant='link' :aria-label='t("go.next")' color='neutral' class='rounded-full cursor-pointer aspect-square')
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

// const transition = {
// 	name: 'transition-fade'
// }

const imgAttrs = {
	class: 'drop-shadow-2xl drop-shadow-primary-950'
}

// const navigate = (value: `#${string}`) => {
// 	const element = document.querySelector(value)
// 	element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
// }

const greetings = useGreetings()
const show = shallowRef(false)
onMounted(() => show.value = true)

const { data } = useUser()
</script>

<style lang="scss" scoped>
</style>
