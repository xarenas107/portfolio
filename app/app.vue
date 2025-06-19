<template lang="pug">
nuxt-route-announcer
//- nuxt-loading-indicator(:hide-delay='500' color="primary")

u-app(:locale)
	nuxt-layout
		u-navigation-bar(v-model:open='menu' :active='!!route.meta.navbar' :back='route.meta.navbar === "back"' sticky)

		//- nuxt-layout(name='animate-skew')
		nuxt-page(:scale-down='menu')
</template>

<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'

const { locale: current } = useI18n()
const locale = computed(() => locales[current.value])
const route = useRoute()

const menu = shallowRef(false)
</script>

<style lang='scss'>
@use '@/assets/scss/styles';
</style>
