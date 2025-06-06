import type { ProjectsCollectionItem } from '@nuxt/content'

export default () => {
	const { locale } = useI18n()
	const key = 'projects'
	const fields = ['title', 'description', 'cover', 'stem', 'id', 'highlighted', 'pinned'] as const

	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key)
			.select(...fields, locale.value)
			.order('stem', 'ASC').all()

		for (const item of response) {
			Object.assign(item, item[locale.value])
			item.id = `${item.stem.split('/').at(-1)}`
			delete item[locale.value]
		}

		return response
	}, {
		default: () => [] as ProjectsCollectionItem[],
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
