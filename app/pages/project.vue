<template lang="pug">
nuxt-layout(v-bind='options' :pending)
</template>

<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'

type Project = {
	id?: number
	title?: string
	description?: string
	subtitle?: string
	image?: string
	layout: string
	cover?: string
	items?: {}[]
}

definePageMeta({
	navbar: 'back',
	// keepalive: true
})

const { t } = useI18n()
const route = useRoute()
const { data, status } = useFetchContent<Project>(`project/${route.query.id}`, {
	default: () => ({
		title: '',
		layout: 'case-study',
		items: []
	}),
})

const options = computed(() => {
	const { title, description, items, layout, cover } = data.value || {}
	return {
		name: `project-${layout}` as LayoutKey,
		title, description, items, cover
	}
})

const { pending } = useStatus(status)
</script>

<style lang="scss" scoped>
</style>
