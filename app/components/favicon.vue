<template lang="pug">
svg(xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 53.2')
	polygon(:class="ui.base" points='47.8 15.4 36 3.6 24.2 15.4 12.4 27.2 24.2 39 24.2 39 36 50.8 47.8 39 36 27.2 47.8 15.4')
	polygon(:class="ui.highlight" points='12 3.3 22.4 13.8 10.4 25.7 0 15.2 12 3.3')
	polygon(:class="ui.highlight" points='10.5 28.6 22.4 40.5 11.9 51 0 39 10.5 28.6')
</template>

<script setup lang="ts">
type Props = {
	ui?: {
		base?: string
		highlight?: string
	}
}
const props = defineProps<Props>()

const ui = computed(() => {
	const {
		base = 'fill-neutral-700 dark:fill-neutral-300',
		highlight = 'fill-primary-500 dark:fill-primary-600'
	} = props.ui || {}

	return { base, highlight }
})
</script>

<style lang="scss" scoped></style>
