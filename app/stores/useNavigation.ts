export default () => {
	const { locale, localeCodes } = useI18n()
	const hash = useHashRoute()

	const key = 'sections'
	const fields = ['stem', 'id', 'title', 'icon', 'order', 'active'] as const

	const { data, execute, status } = useLazyAsyncData(key, async () => {
		const response = await queryCollection(key)
			.order('order', 'ASC')
			.select(...fields, locale.value)
			.all()

		for (const route of response) {
			Object.assign(route, { ...route, ...route[locale.value] ?? {} })
			localeCodes.value.forEach(code => delete route[code])
		}
		return response
	}, {
		default: () => [],
		watch: [locale]
	})

	const links = computed(() => {
		const items = new Set(data.value)
		return Array.from(items)
			?.filter(({ active }) => active)
			?.map(({ id, stem, icon, title }, index) => {
				const identifier = stem.split('/').at(-1) ?? id

				return {
					icon,
					text: title,
					to: `/#${identifier}`,
					active: hash.value === `#${identifier}`,
					kbds: ['Shift', `F${index + 1}`],
					id: identifier
				}
			})
	})

	const states = useStatus(status)

	const actions = {
		go: (value: string, callback?: () => void) => {
			hash.value = value

			if (typeof callback === 'function') callback()
			const element = document.querySelector(`#${value}`)
			element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
		},
		next: () => {
			const index = links.value.findIndex(({ active }) => active)
			const next = links.value.at(index + 1 < links.value.length ? index + 1 : -1)
			if (next) actions.go(next?.id)
		},
		prev: () => {
			const index = links.value.findIndex(({ active }) => active)
			const prev = links.value.at(index === 0 ? 0 : index - 1)
			if (prev) actions.go(prev?.id)
		},
		execute
	}

	return {
		data: links,
		...states,
		...actions
	}
}
