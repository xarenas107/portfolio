import type { CertificatesCollectionItem } from '@nuxt/content'

export default () => {
	const { locale, t } = useI18n()

	const key = 'certificates'
	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key)
			.select('title', 'provider', 'image', 'credentials', 'startAt', 'stem', 'endAt', locale.value)
			.order('stem', 'DESC').all()

		for (const item of response) {
			Object.assign(item, item[locale.value])
			delete item[locale.value]
		}

		return response
	}, {
		default: () => [] as CertificatesCollectionItem[],
		watch: [locale]
	})

	const states = useStatus(status)

	return {
		data,
		execute,
		...states
	}
}
