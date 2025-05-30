interface Options {
	onReady?: () => void
}

export const useHashRoute = (options: Options = {}) => {
	const router = useRouter()
	const route = useRoute()

	const active = shallowRef(false)

	const state = computed({
		get: () => route.hash,
		set(data) {
			const value = active.value ? data || undefined : route.hash
			const is = value?.startsWith('#')
			const hash = value ? is ? value : `#${value}` : value
			router.replace({ ...route, hash })
		}
	})

	onNuxtReady(() => {
		active.value = true

		const { onReady } = options
		if (typeof onReady === 'function') onReady()
	})

	return state
}
