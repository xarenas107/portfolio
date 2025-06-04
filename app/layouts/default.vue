<template lang='pug'>
div(class='bg-default selection:bg-primary/20 selection:text-primary')
	slot
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const head = useLocaleHead()
const app = useAppConfig()
const tailwind = useTailwind()
const dark = usePreferredDark()

const title = () => app.name

const color = computed(() => {
	const colors = tailwind.theme.colors as Record<string, Record<number, string>>
	const { primary } = app.ui.colors
	const variant = dark.value ? 400 : 500
	return colors[primary]?.[variant]
})

const href = computed(() => {
	const regex = color.value?.replace(/[#%]/g, '')
	return `/api/favicon?color=${regex}&mode=${dark.value ? 'dark' : 'light'}`
})

useSeoMeta({
	title,
	titleTemplate: `${app.name} - ${app.author.name}`,
	description: () => t('app.description'),
	themeColor: () => color.value,
	ogImage: () => href.value,
	// ogImage: () => '/hero/human.png',
	ogImageAlt: title,
	ogLocale: locale,
	ogLocaleAlternate: 'en',
	author: app.author.name,
	twitterTitle: title,
	twitterDescription: () => t('app.description'),
	twitterImage: () => href.value,
	// twitterImage: () => '/hero/human.png',
	twitterCard: 'player'
})

const meta = computed(() => {
	return {
		htmlAttrs: {
			...head.value?.htmlAttrs
		},
		meta: [
			...(head.value?.meta || [])
		],
		link: [
			{ rel: 'icon', type: 'image/png', href: '/icons/favicon.png' },
			...(head.value?.link || [])
		]
	}
})

useHead(meta)

// use dynamic favicon color
if (!import.meta.dev) useFavicon(href)
</script>

<style scoped>

</style>
