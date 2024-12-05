export default defineNuxtPlugin(() => {
	const app = useAppConfig()
	const storage = useLocalStorage('color', () => '')

	app.ui.primary = storage.value || app.ui.primary

	watch(() => app.ui.primary, (value) => {
		if (storage.value !== value) storage.value = value
	})

	onNuxtReady(() => {
		if (!storage.value) app.ui.primary = 'orange'
	})
})
