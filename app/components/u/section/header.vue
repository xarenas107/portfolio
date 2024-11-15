<template lang='pug'>
h5(:class='`font-${weight} uppercase text-sm sm:text-md`') {{ title }}
</template>

<script lang='ts' setup>
type Props = {
	title?: string
	weight?: string
}
withDefaults(defineProps<Props>(), {
	weight: () => 'medium'
})
</script>

<style lang='scss' scoped>
</style>
