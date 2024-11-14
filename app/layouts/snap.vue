<template lang='pug'>
div(:class='[snap]' class='max-h-dvh overflow-auto')
    slot(v-bind='{ class: [align, stop] }')
</template>


<script setup lang="ts">
type Props = {
    orientation?: 'vertical' | 'horizontal' | boolean
    mandatory?: boolean
    align?: 'start' | 'end' | 'center' | false
    stop?: 'normal' | 'always' | false
}

const props = withDefaults(defineProps<Props>(), {
    orientation: 'vertical',
    mandatory: true,
    align: 'center',
    stop: 'always',
})

const stop = computed(() => {
    const { stop } = props
    if (stop) return `snap-${stop}`
})

const align = computed(() => {
    const { align } = props
    if (!align) return 'snap-align-none'
    return `snap-${align}`
})

const snap = computed(() => {
    const { orientation, mandatory } = props

    const items = []

    items.push(mandatory ? 'snap-mandatory' : 'snap-proximity')

    if (!orientation) items.push('snap-none')
    else if (orientation === 'vertical') items.push('snap-y')
    else if (orientation === 'horizontal') items.push('snap-x')
    else items.push('snap-both')

    return items.join(' ')
})
</script>

<style scoped>

</style>