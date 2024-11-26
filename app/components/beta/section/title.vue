<template lang="pug">
h1( :class='[{ "hyphens-auto": hyphens }, classes]' lang='es')
	slot
	//- div(class='relative w-24 h-6 bg-slate-900 my-auto rotate-45 before:absolute before:w-6 before:h-16 before:bg-slate-900 before:rotate-45 before:right-0 before:bottom-0 before:translate-y-9 before:-translate-x-1 after:absolute after:w-6 after:h-16 after:bg-slate-900 after:-rotate-45 after:right-0 after:bottom-0 after:translate-y-2 after:-translate-x-1')
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

const classes = 'text-balance flex gap-2 font-display tracking-tight uppercase font-bold text-8xl md:text-9xl lg:text-10xl xl:text-10xl leading-[.8]'
</script>

<style lang='scss' scoped>
::view-transition-old(h1),
::view-transition-new(h1) {
  width: auto;
}
</style>
