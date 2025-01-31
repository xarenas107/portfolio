<template lang="pug">
nuxt-layout(v-bind='data' :name :pending) {{ t('project.overview.name') }}
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
}

definePageMeta({
	navbar: 'back'
})

const { t } = useI18n()
const route = useRoute()
const { data, status } = useFetchContent<Project>(`project/${route.query.id}`, {
	default: () => ({
		title: '',
		layout: 'case-study',
		items: []
	})
})

const name = computed(() => {
	return `project-${data.value?.layout}` as LayoutKey
})

const { pending } = useStatus(status)
</script>

<style lang="scss" scoped>
</style>
