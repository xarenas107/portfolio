<template lang='pug'>
client-only()
	template(#fallback)
		u-skeleton(class='min-w-32 h-8 rounded-lg bg-inverted/50 w-full')

	u-tooltip(:text :open='!popover && hover')
		div(v-hover='change')
			u-select(v-model:open='popover' :model-value='locale' @update:model-value='update' :items='locales' :aria-label="text" :placeholder='text' icon='i-heroicons:language' label-key="name" value-key="code" class='min-w-32 w-full hover:bg-inverted/10 cursor-pointer focus-visible:bg-inverted/10 focus:focus-visible:ring-2 focus:focus-visible:ring-inverted' size='lg' variant='ghost')

				template(#leading)
					div(ref='element')
						u-icon(name='i-heroicons:language' size='xl' class='shrink-0 w-5 h-5 -mb-1')
</template>

<script lang='ts' setup>
const { t, locales, locale, getLocaleMessage, setLocale, setLocaleCookie } = useI18n()

const target = useTemplateRef('element')

const text = computed(() => t('language.select'))
const update = async (value: typeof locale['value']) => {
	if (locale.value === value) return
	const element = target.value

	useRadialTransition(element, async () => {
		const messages = getLocaleMessage(value)
		const cached = Object.keys(messages)
		if (!cached.length) await setLocale(value)
		setLocaleCookie(value)
		locale.value = value
	})
}

const change = (value: boolean) => hover.value = value
const hover = shallowRef(false)
const popover = shallowRef(false)
</script>

<style lang='scss' scoped>
</style>
