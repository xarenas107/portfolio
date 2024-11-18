<template lang="pug">
section-hero(v-intersect='intersect' ref='section')#home
section-studies(v-intersect='intersect' ref='section')#studies
section-certificates(v-intersect='intersect' ref='section')#certificates
section-experiences(v-intersect='intersect' ref='section')#experience
section-skills(v-intersect='intersect' ref='section')#skills
//- section-projects
section-footer
</template>

<script lang="ts" setup>
definePageMeta({
	navbar: true,
	keepalive: true
})

const hash = useHashRoute()
const section = ref(null)

const intersect = [
	(entries: IntersectionObserverEntry[]) => {
		entries.forEach(({ isIntersecting, target }) => {
			if (isIntersecting) hash.value = target.id
		})
	}, {
		rootMargin: '10%',
		threshold: 0.75
	}]
</script>

<style lang="scss">
@use '@/assets/scss/styles';
@use '@/assets/scss/transition';
@use '@/assets/scss/scrollbar';
@use '@/assets/scss/fonts';
</style>
