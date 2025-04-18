<template lang="pug">
nuxt-route-announcer
nuxt-layout
	u-app
		u-navigation-bar(:active='!!route.meta.navbar' :back='route.meta.navbar === "back"')

		nuxt-layout(name='animate-skew')
			nuxt-page
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

<style lang='scss'>
@use '@/assets/scss/styles';
@use '@/assets/scss/transition';
@use '@/assets/scss/scrollbar';
@use '@/assets/scss/fonts';
</style>
