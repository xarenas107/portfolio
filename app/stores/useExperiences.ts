import type { ExperiencesCollectionItem } from '@nuxt/content'

export default () => {
	const { locale } = useI18n()

	const key = 'experiences'
	const fields = ['provider', 'abbreviation', 'active', 'description', 'startAt', 'endAt', 'location'] as const

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
		default: () => [] as ExperiencesCollectionItem[],
		watch: [locale]
	})

	const states = useStatus(status)

	return {
		data,
		execute,
		...states
	}
}
