export default defineNuxtPlugin((nuxt) => {
	const hash = useState<string>('to:hash')

	nuxt.hook('page:finish', () => {
		console.log('ready')
		const el = document.querySelector(hash.value)
		if (el) el.scrollIntoView({ behavior: 'smooth' })
	})
})
