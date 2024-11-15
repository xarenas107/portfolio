type Contact = {
	title: string
	icon: string
	href?: string
}

type Data = {
	image?: string
	name?: string
	description?: string
	job?: string
	portfolio: Contact[]
	contact: Contact[]
	location?: string
}

export default () => {
	const { data, status, execute } = useFetchContent<Data>('section/home', {
		dedupe: 'defer',
		default: () => ({
			portfolio: [],
			contact: []
		})
	})

	const states = useStatus(status)

	return reactive({
		data,
		execute,
		...states
	})
}
