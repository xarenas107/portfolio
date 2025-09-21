<template lang="pug">
nuxt-route-announcer
//- nuxt-loading-indicator(:hide-delay='500' color="primary")

u-app(:locale)
	nuxt-layout(class='relative')
		u-navigation-bar(v-model:open='menu' :active='!!route.meta.navbar' :back='route.meta.navbar === "back"')
		//- nuxt-layout(name='animate-skew')
		nuxt-page(:scale-down='menu')
</template>

<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'

const { locale: current } = useTranslation()
const locale = computed(() => locales[current.value])
const route = useRoute()

const menu = shallowRef(false)
</script>
