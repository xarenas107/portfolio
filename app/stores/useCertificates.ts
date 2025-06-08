import type { CertificatesCollectionItem } from '@nuxt/content'

export default () => {
	const { locale, t } = useI18n()

	const key = 'certificates'
	const fields = ['title', 'provider', 'image', 'credentials', 'startAt', 'stem', 'endAt', 'active'] as const

	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key)
			.where('active', '=', true)
			.select(...fields, locale.value)
			.order('stem', 'DESC').all()

		for (const item of response) {
			Object.assign(item, item[locale.value])
			delete item[locale.value]
		}

		return response
	}, {
		default: () => [] as CertificatesCollectionItem[],
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
