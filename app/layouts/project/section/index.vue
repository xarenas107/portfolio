<template lang="pug">
section(class='flex flex-col gap-8')
	nuxt-layout(name='project-section-title') {{ title }}
	slot
</template>

<script lang="ts" setup>
type Props = {
	title?: string
}

defineProps<Props>()
</script>

<style lang='scss' scoped>
::view-transition-old(h1),
::view-transition-new(h1) {
  width: auto;
}
</style>
