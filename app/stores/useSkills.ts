export default () => {
	const { locale } = useTranslation()

	const key = 'skills'
	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key)
			.where('active', '=', true)
			.select('title', 'content', 'stem', locale.value)
			.order('stem', 'ASC').all()

		for (const item of response) {
			Object.assign(item, item[locale.value])
			delete item[locale.value]
		}

		return response
	}, {
		default: () => [],
		watch: [locale],
		dedupe: 'defer'
	})

	const states = useStatus(status)

	return {
		data,
		execute,
		...states
	}
}
