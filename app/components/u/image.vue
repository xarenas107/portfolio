<template lang='pug'>
u-placeholder(:class :content-class :ui='ui.placeholder' :pending :transition)
    template(#default='props')
        transition(v-bind='transition')
            nuxt-img(v-if='data' v-bind='props' :src='data' @load='show' format="webp" loading='lazy')
</template>

<script lang='ts' setup>
import type { TransitionProps } from 'vue'

type Props = {
    src?: string
    class?: string
    contentClass?: string
    transition?: TransitionProps
    ui?: {
        placeholder?: {
            svg?: {
                base?: string
                opacity?: string | number
            }
        }
    }
}

const props = withDefaults(defineProps<Props>(), {
    transition: () => ({ name: 'transition-fade' }),
    src: () => '/',
    ui: () => ({
        placeholder: {
            svg: {
                base: 'bg-primary-400 dark:bg-primary-400 stroke-primary-600 dark:stroke-primary-200',
            },
        }
    }),
})

const { data, execute } = useLazyAsyncData(props.src, async () => {
    const blob = await $fetch<Blob>(props.src)
    const src = new File([blob], props.src, { type: blob?.type })
    const data = URL.createObjectURL(src)
    pending.value = false
    return data
}, {
    immediate: false
})

const transition = computed(() => {
    const { transition } = props
    if (!transition) return  undefined
    return typeof transition === 'string' ? { name: transition } : transition
})

onMounted(() => nextTick(execute))

const pending = shallowRef(true)
const show = () => pending.value = false
</script>

<style lang='scss' scoped>
</style>
