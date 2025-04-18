import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
	collections: {
		section: defineCollection({
			type: 'page'
		})
	}
})
