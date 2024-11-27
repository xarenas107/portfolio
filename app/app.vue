<template lang="pug">
nuxt-route-announcer
nuxt-layout
	u-navigation-bar(:active='!!route.meta.navbar')
		template(#avatar v-if='route.meta.navbar === "back"')
			u-navigation-button-back

	nuxt-layout(name='animate-skew')
		nuxt-page
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

<style lang='scss'>
</style>
