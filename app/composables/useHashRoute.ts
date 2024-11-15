interface Options {
	onReady?: () => void
}

export const useHashRoute = (options: Options = {}) => {
	const router = useRouter()
	const route = useRoute()

	const state = computed({
		get: () => route.hash,
		set(data) {
			const value = data !== null ? data : undefined
			const is = value?.startsWith('#')
			const hash = value ? is ? value : `#${value}` : value
			router.replace({ ...route, hash })
		}
	})

	onNuxtReady(() => {
		const { onReady } = options
		if (typeof onReady === 'function') onReady()
	})

	return state
}
