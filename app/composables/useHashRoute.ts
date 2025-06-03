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
			if (!data) return
			const value = active.value ? data : route.hash
			const parsed = value?.startsWith('#') ? value : `#${value}`
			const hash = value ? parsed : undefined
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
