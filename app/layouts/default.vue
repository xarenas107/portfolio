<template lang='pug'>
//- color-scheme
div(class='bg-slate-100 dark:bg-slate-900')
    slot
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const head = useLocaleHead()
const { origin } = useRequestURL()
const app = useAppConfig()

const title = () => app.author.name
const isDev = import.meta.dev

useSeoMeta({
	title,
	description: () => t('app.description'),
	ogTitle: title,
	ogDescription: () => t('app.description'),
	ogImage: `${origin}/icons/favicon%20-%20adaptative.svg`,
	ogImageAlt: title,
	ogLocale: locale,
	ogLocaleAlternate: 'en',
	twitterTitle: title,
	twitterDescription: () => t('app.description'),
	twitterImage: `${origin}/icons/favicon%20-%20adaptative.svg`,
	twitterCard: 'summary'
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
			...(head.value?.link || []),
			{
				rel: 'icon',
				type: 'image/svg+xml',
				href: `/icons/favicon - ${isDev ? 'dev' : 'adaptative'}.svg`
			}
		]
	}
})

useHead(meta)
</script>

<style scoped>

</style>
