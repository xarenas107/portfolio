<template lang='pug'>
div(class='bg-slate-100 dark:bg-slate-950')
    slot
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const head = useLocaleHead()
const app = useAppConfig()
const tailwind = useTailwind()
const dark = usePreferredDark()
// const { origin } = useRequestURL()

const title = () => app.author.name

const color = computed(() => {
	const colors = tailwind.theme.colors as Record<string, Record<number, string>>
	const variant = dark.value ? 600 : 500
	return colors[app.ui.primary]?.[variant]
})

const href = computed(() => {
	const hex = color.value?.replace('#', '')
	return `/api/favicon?color=${hex}&mode=${dark.value ? 'dark' : 'light'}`
})

useSeoMeta({
	title,
	// titleTemplate: () => title(),
	description: () => t('app.description'),
	themeColor: () => color.value,
	ogImage: () => href.value,
	// ogImage: () => '/hero/human.png',
	ogImageAlt: title,
	ogLocale: locale,
	ogLocaleAlternate: 'en',
	author: title,
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
