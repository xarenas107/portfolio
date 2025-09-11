type LocaleCode = 'en' | 'es'

export default () => {
	const { $t, getLocaleName, switchLocale, getLocales, defaultLocale, getLocale } = useI18n()

	const t = (key: string, params?: Record<string, string | number | boolean>) => $t(key, params) as string

	const locale = computed({
		get: () => (getLocale() || defaultLocale() || 'en') as LocaleCode,
		set: (value: string) => switchLocale(value)
	})

	const locales = computed(() => getLocales())
	const localeCodes = computed(() => {
		const list = getLocales()
		return list.map(locale => locale.code) as LocaleCode[]
	})

	return { t, locale, localeCodes, locales }
}
