<template lang="pug">
h1( :class='[{ "hyphens-auto": hyphens }, classes]' lang='es')
	slot
	u-icon(v-if='icon' :name='icon' )
</template>

<script lang="ts" setup>
type Props = {
	hyphens?: boolean
	icon?: string
}

withDefaults(defineProps<Props>(), {
	icon: () => ''
})

const classes = 'text-balance flex gap-2 font-display uppercase font-bold text-4xl md:text-6xl lg:text-8xl'
</script>

<style lang='scss' scoped>
::view-transition-old(h1),
::view-transition-new(h1) {
  width: auto;
}
</style>
