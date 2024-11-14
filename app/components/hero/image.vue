<template lang="pug">
div(class='relative overflow-visible w-full lg:order-1 lg:max-w-lg lg:h-[60dvh] lg:max-h-dvh' ref='image')
    u-lazy(:transition='{ name: "transition-grow-y" }' :dealy='100' class='w-full h-full pointer-events-none')
        div(key='bg-hero' class='w-full h-full min-h-[30dvh] sm:min-h-[40dvh] rounded-lg bg-primary-500 dark:bg-primary-600 relative overflow-visible z-20  lg:rounded-b-[50%]')
            //- bg-gradient(class='mix-blend-multiply')

            nuxt-img(src='/hero/human-shadow.png' class='absolute rounded-lg lg:rounded-b-full bottom-0 right-0 grow object-cover max-w-full h-[50dvh] sm:h-[60dvh] lg:h-[90dvh] z-10 blend-multiply opacity-70' loading='eager' key="image:shadow" cover)

            nuxt-img(src='/hero/human.png' class='absolute rounded-lg lg:rounded-b-full bottom-0 right-0 grow object-cover max-w-full h-[50dvh] sm:h-[60dvh] lg:h-[90dvh] z-10' key="image" 
            loading='eager' cover)
    
    
    //- Shadow gradient
    u-lazy(:transition='{ name: "transition-fade" }' class='w-full h-full pointer-events-none')
        div(class='drop-shadow-xl saturate-200 backdrop-blur-md blur-3xl opacity-70')
            div(class='bg-primary-500/30 aspect-square w-[32rem] absolute top-0 left-0 -translate-x-[20%] -translate-y-[120%] rounded-full skew-y-16')
            div(class='bg-slate-600/70 aspect-square w-[24rem] absolute top-[50%] right-0 translate-x-[15%] -translate-y-[120%] rounded-full -skew-x-12')
            div(class='bg-slate-300/20 aspect-square w-[24rem] absolute top-full translate-x-[20%] -translate-y-[70%] rounded-full skew-x-16')

</template>

<script lang="ts" setup>
const reduceMotion = usePreferredReducedMotion()
const target = useTemplateRef('image')

const state = {
    active: false
}

const round = (value: number) => Math.round(Math.max(Math.min(value, 5), -5))

const on = {
    mousemove: useThrottleFn( (event: MouseEvent) => {
        if (reduceMotion.value === 'reduce') return

        const element = target.value
        const { width = 0, height = 0 } = element?.getBoundingClientRect() || {}
        
        const move = {
            x:  Math.round((width / 2) - event.offsetX),
            y:  Math.round((height / 2) - event.offsetY),
            z: 0
        }

        if (element) {
            element.style.transformStyle = 'preserve-3d'

            move.z = round((move.x + move.y) / 10)

            element.style.transform = `rotateY(${move.x / 10}deg) rotateX(${move.y / 10}deg) rotateZ(${move.z}deg) perspective(550px)`
            element.style.transition = 'transform ease .5s'
        }

        if (!state.active) useEventListener(target, 'mouseleave', on.leave, { once: true })
        state.active = true
    }),
    leave: () => {
        const element = target.value
        if (element) element.style.transform = ''
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
</style>
