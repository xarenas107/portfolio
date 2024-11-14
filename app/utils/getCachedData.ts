export function getCachedData<T>(key: string) {
	const nuxt = useNuxtApp()
	const data = nuxt?.static?.data?.[key] ?? nuxt.payload?.data?.[key]
	return data as T
}
