<template lang="pug">
beta-section-home(v-intersect='intersect' :scale-down ref='section')#home
beta-section-studies(v-intersect='intersect' :scale-down ref='section')#studies
beta-section-certificates(v-intersect='intersect' :scale-down ref='section')#certificates
beta-section-experiences(v-intersect='intersect' :scale-down ref='section')#experiences
beta-section-skills(v-intersect='intersect' :scale-down ref='section')#skills
beta-section-projects(v-intersect='intersect' :scale-down ref='section')#portfolio
beta-section-footer(:scale-down)

lazy-cursor(:content='user.name' :delay="2000" :target)
</template>

<script lang="ts" setup>
definePageMeta({
	navbar: true,
	keepalive: false,
	viewTransition: false
})

type Props = {
	scaleDown?: boolean
}

const props = defineProps<Props>()
const { data: user } = useUser()
const hash = useHashRoute()
const section = ref(null)

const target = computed(() => `${hash.value || '#home'} [data-cursor="true"]`)

const intersect = [
	(entries: IntersectionObserverEntry[]) => {
		entries.forEach(({ isIntersecting, target }) => {
			if (isIntersecting) hash.value = target.id
		})
	}, {
		rootMargin: '32px',
		threshold: 0.3
	}
]
</script>
