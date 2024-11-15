<template lang='pug'>
client-only()
    template(#fallback)
        u-skeleton(class='min-w-32 h-8 rounded-lg bg-slate-300/50 dark:bg-slate-700/50')

    u-select-menu(:model-value='locale' @update:model-value='update' :options='locales' :ui :aria-label="t('language.option', 2)" :placeholder='t("language.select")' icon='i-heroicons:language' value-attribute="code" option-attribute="name" class='min-w-32' variant='none' ref='element')
        template(#empty) {{ t('search.empty') }}

        //- template(#option='{ option }')
        //-     span(@click="event => click(event, option.code)") {{ option.name }}
</template>

<script lang='ts' setup>
const { t, locales, locale, getLocaleMessage, setLocale, setLocaleCookie } = useI18n()

const ui = {
	icon: {
		base: 'text-slate-700 dark:text-slate-300'
	},
	color: {
		white: {
			none: 'hover:bg-slate-300/50 hover:dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:dark:text-slate-100'
		}
	}
}

const target = useTemplateRef('element')

const update = async (value: typeof locale['value']) => {
	const element = target.value?.$el.nextSibling

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
