<template lang="pug">
u-main(ref='main')
    slot
</template>

<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue'

type State = {
    scroll: number
    timer?: NodeJS.Timeout
    pause?: boolean
    current: number
    ease: number
}

const reduceMotion = usePreferredReducedMotion()
const main = useTemplateRef<ComponentPublicInstance>('main')
const state: State = {
    scroll: 0,
    pause: true,
    current: 0,
    ease: 0.75
}

const update = () => {
    if (state.pause || reduceMotion.value === 'reduce') return

    const diff = state?.scroll - window.scrollY
    const clamp = Math.max(-30, Math.min(diff, 30))
    const speed = Math.round(clamp) * .1

    const element = main.value?.$el as HTMLElement
    
    if (element) {
        element.style.transform = `skewY(${ speed }deg)`
        element.style.transition = 'transform ease-out .2s'
    }

    state.scroll = window.scrollY

    if (state.timer) clearTimeout(state.timer)     
    state.timer = setTimeout(() => {
        if (element) element.style.transform = 'skewY(0deg)'
    }, 150)

    // Smooth scroll
    // state.current = state.current * (1 - state.ease) + state.scroll * state.ease
    // element.style.transform = `${element.style.transform} translate3d(0, ${-state.current}px, 0)`
}

useEventListener('scroll', update)

onBeforeUpdate(() => {
    state.pause = true
})
onUpdated(() => state.pause = false)

onMounted(() => {
    state.scroll = window.scrollY
    state.pause = false
})
</script>

<style lang='scss'>
</style>