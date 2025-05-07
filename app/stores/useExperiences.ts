export default () => {
	const { locale, t } = useI18n()

	const key = 'experiences'
	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key)
			.select('provider', 'abbreviation', 'active', 'description', 'startAt', 'endAt', 'location', locale.value)
			.order('startAt', 'DESC').all()

		for (const item of response) {
			Object.assign(item, item[locale.value])
			delete item[locale.value]
		}

		return response
	}, {
		dedupe: 'defer',
		watch: [locale]
	})

	const states = useStatus(status)

	return {
		data,
		execute,
		...states
	}
}
