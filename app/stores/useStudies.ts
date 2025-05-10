import type { StudiesCollectionItem } from '@nuxt/content'

export default () => {
	const { locale } = useI18n()

	const key = 'studies'
	const fields = ['title', 'provider', 'type', 'location', 'startAt', 'endAt', 'active'] as const

	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key)
			.select(...fields, locale.value)
			.order('startAt', 'DESC').all()

		for (const item of response) {
			Object.assign(item, item[locale.value])
			delete item[locale.value]
		}

		return response
	}, {
		default: () => [] as StudiesCollectionItem[],
		watch: [locale]
	})

	const states = useStatus(status)

	return {
		data,
		execute,
		...states
	}
}
