<template lang='pug'>
nuxt-img(:src v-slot="{ src, isLoaded, imgAttrs }" format="webp" preset="cover" custom)
	u-placeholder(v-if='!isLoaded' :class pending)
	img(v-else :src :class v-bind="imgAttrs")
</template>

<script lang='ts' setup>
type Props = {
	src?: string
	class?: string
}

withDefaults(defineProps<Props>(), {
	src: () => '/'
})
</script>

<style lang='scss' scoped>
</style>
