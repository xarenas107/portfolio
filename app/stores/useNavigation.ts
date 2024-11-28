export default () => {
	const { locale } = useI18n()
	const hash = useHashRoute()
	const { data, execute, status } = useLazyAsyncData('navigation:links', async () => {
		const pick = ['id', 'icon', 'order', 'title']
		const response = await queryContent('section').locale('').only(pick).sort({ order: 1 }).find()

		for (const route of response) {
			const path = `section/${route.id}`
			const { title } = await queryContent(path).locale(locale.value).only('title').findOne() ?? {}
			route.title = title
		}

		return response
	}, {
		server: false,
		dedupe: 'defer',
		default: () => [],
		watch: [locale]
	})

	const links = computed(() => {
		const items = new Set(data.value)
		return Array.from(items)?.map(({ id, icon, title }, index) => {
			return {
				id,
				icon,
				label: title,
				to: `/#${id}`,
				active: hash.value === `#${id}`,
				shortcut: ['Shift', `F${index + 1}`]
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
			actions.go(next?.id)
		},
		prev: () => {
			const index = links.value.findIndex(({ active }) => active)
			const prev = links.value.at(index === 0 ? 0 : index - 1)
			actions.go(prev?.id)
		},
		execute
	}

	return reactive({
		data: links,
		...states,
		...actions
	})
}
