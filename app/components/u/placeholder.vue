<template lang='pug'>
div(class='relative overflow-hidden placeholder') 
    transition(v-bind='transition')
        svg(v-if='pending && !disabled' :class='classes' class='absolute inset-0 h-full w-full motion-safe:animate-pulse' fill='none')
            defs
                pattern(x='0' y='0' width='10' id='stroke-pattern' height='10' patternUnits='userSpaceOnUse')
                    path(d='M-3 13 15-5M-5 5l18-18M-1 21 17 3')
            rect(stroke='none' fill='url(#stroke-pattern)' width='100%' height='100%')

        slot(v-else :class='[contentClass]')
</template>

<script lang='ts' setup>
import type { TransitionProps } from 'vue'

type Props = {
    pending?: boolean
    contentClass?: string
    transition?: TransitionProps | string
    disabled?: boolean
    ui?: {
        svg?: {
            base?: string
            opacity?: string | number
        }
    }
}

const props = withDefaults(defineProps<Props>(), {
    pending: () => true,
    contentClass: () => 'z-10',
    ui: () => ({}),
})

const transition = computed(() => {
    const { transition } = props
    if (!transition) return { disabled: true }
    return typeof transition === 'string' ? { name: transition } : transition
})

const classes = computed(() => {
    const { 
        opacity = 30, 
        base = 'bg-slate-500 stroke-primary-600 dark:bg-slate-500 dark:stroke-primary-400'
    } = props.ui?.svg || {}

    return [{ 
        "animate-none": !props.pending,
        [`opacity-${ opacity }`]: opacity,
    }, base]
})
</script>

<style lang='scss' scoped>
</style>
