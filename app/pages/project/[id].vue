<template lang="pug">
nuxt-layout(v-if='data?.layout' v-bind='options' :pending)
</template>

<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'

const route = useRoute()
definePageMeta({
	navbar: 'back'
})

const id = computed(() => (route.params as any).id)
const { data, pending } = useProject(id)

const options = computed(() => {
	const { title, description, sections, layout, cover } = data.value || {}
	return {
		name: `${layout}` as LayoutKey,
		title, description, sections, cover
	}
})
</script>

<style lang="scss" scoped>
</style>
