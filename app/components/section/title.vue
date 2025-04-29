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

const classes = 'text-balance flex gap-2 font-display uppercase font-bold text-8xl md:text-9xl lg:text-10xl xl:text-10xl leading-[.8]'
</script>

<style lang='scss' scoped>
::view-transition-old(h1),
::view-transition-new(h1) {
  width: auto;
}
</style>
