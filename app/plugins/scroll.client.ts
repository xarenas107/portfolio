export default defineNuxtPlugin((nuxt) => {
	const hash = useState<string>('to:hash')

	nuxt.hook('page:finish', () => {
		if (!hash.value) return
		const el = document.querySelector(hash.value)
		if (el) el.scrollIntoView({ behavior: 'smooth' })
	})
})
