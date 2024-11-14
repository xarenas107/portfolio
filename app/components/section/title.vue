<template lang="pug">
h1( :class='[{ "hyphens-auto": hyphens }, classes]')
  slot
  u-icon(v-if='icon' :name='icon')
</template>

<script lang="ts" setup>
type Props = {
  hyphens?: boolean
  icon?: string
}

defineProps<Props>()

const classes = 'text-balance flex gap-2 font-display tracking-tight uppercase font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-10xl xl:text-10xl'
</script>

<style lang='scss' scoped>
::view-transition-old(h1),
::view-transition-new(h1) {
  width: auto;
}
</style>