type LocaleCode = 'en' | 'es'
type Params = number | Record<string, string | number | boolean>

export default () => {
	const { tc, switchLocale, getLocales, defaultLocale, getLocale } = useI18n()

	const t = (key: string, params: Params = 1) => tc(key, params)

	const locale = computed({
		get: () => (getLocale() || defaultLocale() || 'en') as LocaleCode,
		set: (value: string) => switchLocale(value)
	})

	const locales = computed(() => getLocales())
	const localeCodes = computed(() => {
		const list = getLocales()
		return list.map(locale => locale.code) as LocaleCode[]
	})

	return { t, locale, localeCodes, locales, tc: t }
}
