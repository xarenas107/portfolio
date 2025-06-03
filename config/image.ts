import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['image']>{
	presets: {
		cover: {
			modifiers: {
				fit: 'cover',
				format: 'webp'
			}
		}
	}
}
