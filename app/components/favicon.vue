<template lang="pug">
svg(xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 53.2')
	polygon(:class="ui.base" points='38.4 50.4 15 27 38.4 3.6 48 13.3 34.2 27 48 40.8 38.4 50.4')
	path(:class="ui.highlight" d='M9.9,2.3L0,12.3l9.9,9.9,9.9-9.9L9.9,2.3Z')
	path(:class="ui.highlight" d='M9.9,31L0,41l9.9,9.9,9.9-9.9-9.9-9.9Z')
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
		base = 'fill-(--ui-bg-inverted)',
		highlight = 'fill-(--ui-primary)'
	} = props.ui || {}

	return { base, highlight }
})
</script>
