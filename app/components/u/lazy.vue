<template lang='pug'>
component(v-intersect='intersect' :is)
  transition(v-bind='transition')
    slot(v-if='intersected')
</template>

<script lang='ts' setup>
import type { TransitionProps } from 'vue'
type Props = {
  transition?: Omit<TransitionProps, 'css'>
  disabled?: boolean
  delay?: number
  once?: boolean
  margin?: string
  threshold?: number | number[]
  as?: keyof HTMLElementTagNameMap
}

const props  = withDefaults(defineProps<Props>(), {
  transition: () => ({ name: 'transition-fade' }),
  delay: () => 0,
  appear: () => true,
  once: () => true
})

const intersected = shallowRef(!!props.disabled)
const is = computed(() => props.as || 'div')

const intersect = [
    (entries: IntersectionObserverEntry[]) => {
        entries.forEach(({ isIntersecting }) => {
          setTimeout(() => {
            intersected.value = isIntersecting
          }, props.delay)
        })
}, {
    rootMargin: props.margin,
    threshold: props.threshold,
    once: props.once,
}]

const transition = computed(() => {
    const { transition, disabled } = props
    if (!transition || disabled) return { css: false }
    return typeof transition === 'string' ? { name: transition } : transition
})
</script>

<style lang='scss' scoped>
// @use '@/assets/scss/transition';
</style>
