<template lang='pug'>
client-only()
	template(#fallback)
		u-skeleton(class='min-w-32 h-8 rounded-lg bg-(--ui-text)/50 w-full')

	u-select-menu(:model-value='locale' @update:model-value='update' :items='locales' :aria-label="t('language.option', 2)" :placeholder='t("language.select")' icon='i-heroicons:language' label-key="name" value-key="code" class='min-w-32 w-full hover:bg-(--ui-text)/10' size='lg' variant='ghost')
		template(#empty) {{ t('search.empty') }}

		template(#leading)
			div(ref='element')
				u-icon(name='i-heroicons:language' size='xl' class='shrink-0 w-5 h-5')
</template>

<script lang='ts' setup>
const { t, locales, locale, getLocaleMessage, setLocale, setLocaleCookie } = useI18n()

const target = useTemplateRef('element')

const update = async (value: typeof locale['value']) => {
	const element = target.value

	useRadialTransition(element, async () => {
		const messages = getLocaleMessage(value)
		const cached = Object.keys(messages)
		if (!cached.length) await setLocale(value)
		setLocaleCookie(value)
		locale.value = value
	})
}
</script>

<style lang='scss' scoped>
</style>
