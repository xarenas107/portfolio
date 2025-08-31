import type { ModuleOptions } from '@nuxt/image'

export default {
	presets: {
		cover: {
			modifiers: {
				fit: 'cover',
				format: 'webp'
			}
		}
	}
} satisfies Partial<ModuleOptions>
