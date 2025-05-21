export default defineNuxtPlugin((nuxt) => {
	const hash = useState<string>('to:hash')
	if (!hash.value) return

	nuxt.hook('page:finish', () => {
		const el = document.querySelector(hash.value)
		if (el) el.scrollIntoView({ behavior: 'smooth' })
	})
})
