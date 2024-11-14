<template lang='pug'>
div(class='flex flex-col gap-4')
	u-section-header(:title :class='ui?.text?.base' weight='semibold')
	slot(:ui)
</template>

<script lang='ts' setup>
type Props = {
	title?: string
	ui?: {
		text?: {
			base?: string
		}
	}
}
withDefaults(defineProps<Props>(), {
	ui: () => ({
		text: {
			base: 'text-slate-900 dark:text-slate-200'
		}
	})
})
</script>

<style lang='scss' scoped>
</style>
