import type { UserCollectionItem } from '@nuxt/content'

export default () => {
	const { locale } = useI18n()
	const key = 'user'
	const fields = ['name', 'fullname', 'comment', 'description', 'job', 'location', 'portfolio', 'contact', 'resume', 'image'] as const

	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key).select(...fields, locale.value).first()
		if (!response) return {} as UserCollectionItem

		Object.assign(response, { ...response, ...response[locale.value] ?? {} })
		delete response[locale.value]

		return response
	}, {
		default: () => ({} as UserCollectionItem),
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
