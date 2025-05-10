export default (id: ComputedRef<string> | Ref<string>) => {
	const _id = unref(id)
	const { locale, localeCodes } = useI18n()
	const key = 'projects'
	const fields = ['title', 'description', 'cover', 'stem', 'id', 'sections', 'layout'] as const

	const { data, execute, status } = useLazyAsyncData(`${key}/${_id}`, async () => {
		const response = await queryCollection(key)
			.select(...fields, locale.value)
			.where('stem', '=', `curriculum/projects/${_id}`)
			.first()

		if (response) {
			response.id = `${_id}`
			Object.assign(response, { ...response, ...response[locale.value] })
			delete response[locale.value]

			response?.sections?.forEach((section, index) => {
				const translate = section[locale.value] || {}

				response.sections ||= []
				response.sections[index] = { ...section, ...translate }

				localeCodes.value.forEach((code) => {
					delete response.sections?.[index]?.[code]
				})
			})
		}
		return response
	}, {
		watch: [locale, id]
	})

	const states = useStatus(status)

	return {
		data,
		execute,
		...states
	}
}
