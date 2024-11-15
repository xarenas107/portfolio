<template lang='pug'>
div(class='infinite-slider flex')
  slot(:items class='infinite-slider-group' aria-hidden)
  slot(:items class='infinite-slider-group')
  slot(:items class='infinite-slider-group' aria-hidden)
</template>

<script lang='ts' generic="T extends unknown"setup>
type Props = {
	stop?: boolean
}

const props = defineProps<Props>()

const items = defineModel<T[]>('items', { default: () => [] })
const state = computed(() => props.stop ? 'paused' : 'running')
const time = computed(() => `${items.value.length * 2}s`)
</script>

<style lang='scss'>
@keyframes scroll {
	from { transform: translateX(-100%) }
	to { transform: translateX(-200%) }
}

.infinite-slider {
  &:hover>&-group { animation-play-state: paused }

  &>&-group {
    will-change: transform;
    animation: scroll v-bind(time) linear infinite;
    animation-play-state: v-bind(state)
  }
}
</style>
