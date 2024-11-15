export default defineNuxtPlugin({
	enforce: 'pre',
	setup() {
		const app = useAppConfig()
		updateSiteConfig({
			name: app.name
		})
	}
})
