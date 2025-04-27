<template lang="pug">
nuxt-route-announcer
u-app(:locale)
	nuxt-layout(data-vaul-drawer-wrapper)
		u-navigation-bar(:active='!!route.meta.navbar' :back='route.meta.navbar === "back"')

		nuxt-layout(name='animate-skew')
			nuxt-page
</template>

<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'
const { locale: current } = useI18n()

const locale = computed(() => locales[current.value])
const route = useRoute()
</script>

<style lang='scss'>
@use '@/assets/scss/styles';
// @use '@/assets/scss/transition';
// @use '@/assets/scss/scrollbar';
// @use '@/assets/scss/fonts';
</style>
