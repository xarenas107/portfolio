export default defineNuxtPlugin(() => {
	const app = useAppConfig()
	const cookie = useCookie('color', { default: () => app.ui.primary })

	app.ui.primary = cookie.value || app.ui.primary

	watch(() => app.ui.primary, (value) => {
		if (cookie.value !== value) cookie.value = value
	})
})
