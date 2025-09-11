import type { StudiesCollectionItem } from '@nuxt/content'

export default () => {
	const { locale } = useTranslation()

	const key = 'studies'
	const fields = ['title', 'provider', 'type', 'location', 'startAt', 'endAt', 'active', 'current'] as const

	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key)
			.where('active', '=', true)
			.select(...fields, locale.value)
			.order('startAt', 'DESC').all()

		for (const item of response) {
			Object.assign(item, item[locale.value])
			delete item[locale.value]
		}

		return response
	}, {
		default: () => [] as StudiesCollectionItem[],
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
