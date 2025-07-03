<template lang="pug">
nuxt-route-announcer
//- nuxt-loading-indicator(:hide-delay='500' color="primary")

u-app(:locale)
	nuxt-layout(class='overflow-x-clip')
		u-navigation-bar(v-model:open='menu' :active='!!route.meta.navbar' :back='route.meta.navbar === "back"')

		//- nuxt-layout(name='animate-skew')
		nuxt-page(:scale-down='menu')
		lazy-cursor(:content='data.name' :delay="2000" :target)
</template>

<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'

const { locale: current } = useI18n()
const locale = computed(() => locales[current.value])
const route = useRoute()
const hash = useHashRoute()
const target = computed(() => `${hash.value} [data-cursor="true"]`)

const menu = shallowRef(false)
const { data } = useUser()
</script>

<style lang='scss'>
@use '@/assets/scss/styles';
</style>
