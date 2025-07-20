import type { ExperiencesCollectionItem } from '@nuxt/content'

export default () => {
	const { locale } = useI18n()

	const key = 'experiences'
	const fields = ['provider', 'abbreviation', 'active', 'description', 'startAt', 'endAt', 'location', 'current', 'job'] as const

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
		default: () => [] as ExperiencesCollectionItem[],
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
