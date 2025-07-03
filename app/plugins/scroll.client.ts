export default defineNuxtPlugin(() => {
	const hash = useState<string>('to:hash')

	onNuxtReady(() => {
		if (!hash.value) return

		const el = document.querySelector(hash.value)
		if (el) el.scrollIntoView({ behavior: 'smooth' })
	})
})
