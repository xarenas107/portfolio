<template lang='pug'>
transition(v-bind='transition')
    div(v-show='show' :class :style class='transition-scale-r-and-down relative')
        slot
</template>

<script lang='ts' setup>
import type { TransitionProps } from 'vue'

type Props = {
	src?: string
	class?: string
	transition?: TransitionProps
	delay?: number | string
}

const props = withDefaults(defineProps<Props>(), {
	class: () => 'bg-no-repeat bg-cover bg-center'
})

const style = computed(() => `background-image: url(${props.src})`)
const show = shallowRef(false)
onMounted(() => {
	setTimeout(() => show.value = true, Number.parseInt(`${props.delay}`))
})
</script>

<style lang='scss' scoped>
</style>
