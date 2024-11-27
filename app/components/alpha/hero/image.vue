<template lang="pug">
div(class='relative overflow-visible w-full lg:max-w-lg lg:h-[60svh] lg:max-h-svh parallax-container' ref='image')
    u-lazy(:transition='{ name: "transition-grow-y" }' :dealy='100' class='w-full h-full pointer-events-none')
        div(key='bg-hero' class='w-full h-full min-h-[30svh] sm:min-h-[40svh] rounded-lg bg-primary-500 dark:bg-primary-600 relative overflow-visible z-20  lg:rounded-b-[50svh]')

            nuxt-img(src='/hero/human-shadow.png' class='absolute rounded-lg lg:rounded-b-full bottom-0 right-0 grow object-cover max-w-full h-[50svh] sm:h-[60svh] lg:h-[90svh] z-10 blend-multiply opacity-70' loading='eager' key="image:shadow" cover)

            nuxt-img(src='/hero/human.png' class='absolute rounded-lg lg:rounded-b-full bottom-0 right-0 grow object-cover max-w-full h-[50svh] sm:h-[60svh] lg:h-[90svh] z-10' key="image"
            loading='eager' cover)

    //- Shadow gradient
    u-lazy(:transition='{ name: "transition-fade" }' class='w-full h-full pointer-events-none')
        div(class='drop-shadow-xl saturate-200 backdrop-blur-md blur-3xl opacity-70')
            div(class='bg-primary-500/40 aspect-square w-[32rem] absolute top-0 left-0 -translate-x-[20%] -translate-y-[120%] rounded-full skew-y-16')
            div(class='bg-primary-600/60 aspect-square w-[24rem] absolute top-[50%] right-0 translate-x-[15%] -translate-y-[120%] rounded-full -skew-x-12')
            div(class='bg-primary-300/20 aspect-square w-[24rem] absolute top-full translate-x-[20%] -translate-y-[70%] rounded-full skew-x-16')
</template>

<script lang="ts" setup>
const reduceMotion = usePreferredReducedMotion()
const target = useTemplateRef('image')

const state = {
	active: false,
	smooth: 0.07
}

const round = (value: number) => Math.round(Math.max(Math.min(value, 5), -5))

const on = {
	mousemove: useThrottleFn((event: MouseEvent) => {
		if (reduceMotion.value === 'reduce') return

		const element = target.value
		const { width = 0, height = 0 } = element?.getBoundingClientRect() || {}
		const { offsetX, offsetY } = event

		const move = {
			x: Math.round((width / 2) - offsetX) * state.smooth,
			y: Math.round((height / 2) - offsetY) * state.smooth,
			z: 0
		}

		if (element) {
			// element.style.transformStyle = 'preserve-3d'

			move.z = round((move.x + move.y) * state.smooth / 2)

			// element.style.transform = `rotateY(${move.x / 50}deg) rotateX(${move.y / 10}deg) rotateZ(${move.z}deg) perspective(550px)`
			// element.style.transition = 'transform ease .5s'

			element.style.setProperty('--rotate-x', `${move.x}deg`)
			element.style.setProperty('--rotate-y', `${move.y}deg`)
			element.style.setProperty('--rotate-z', `${move.z}deg`)
		}

		if (!state.active) useEventListener(target, 'mouseleave', on.leave, { once: true })
		state.active = true
	}),
	leave: () => {
		const element = target.value
		// if (element) element.style.transform = ''

		if (element) {
			element.style.setProperty('--rotate-x', `0deg`)
			element.style.setProperty('--rotate-y', `0deg`)
			element.style.setProperty('--rotate-z', `0deg`)
		}
		state.active = false
	}
}

useEventListener(target, 'mousemove', on.mousemove)
</script>

<style lang="scss" scoped>
.transform-3d {
    transform-style: preserve-3d;
    perspective: 550px;
}

.parallax-container {
  transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) rotateZ(var(--rotate-z)) perspective(550px);
  transform-style: preserve-3d;
  transition: transform 1.5s cubic-bezier(0.05, 0.5, 0, 1);
  will-change: transform;

  &>:last-child {
    transform: translateZ(-3rem)
  }
}
</style>
