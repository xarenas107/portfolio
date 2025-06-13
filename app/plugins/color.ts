export default defineNuxtPlugin(() => {
	const app = useAppConfig()
	const storage = useLocalStorage('color', () => 'indigo')
	if (storage.value) app.ui.colors.primary = storage.value

	onNuxtReady(() => {
		watch(() => app.ui.colors.primary, (value) => {
			if (storage.value !== value) storage.value = value
		})
	})
})
