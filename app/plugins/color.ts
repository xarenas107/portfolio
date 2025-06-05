export default defineNuxtPlugin((nuxt) => {
	const app = useAppConfig()
	const storage = useLocalStorage('color', () => '')

	app.ui.colors.primary = storage.value || app.ui.colors.primary

	watch(() => app.ui.colors.primary, (value) => {
		if (storage.value !== value) storage.value = value
	})

	onNuxtReady(() => {
		if (!storage.value) app.ui.colors.primary = 'indigo'
	})
})
