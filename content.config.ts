import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
	content: {
		preview: {
			api: 'https://api.nuxt.studio',
		},
		experimental: { nativeSqlite: true },
	}
})
