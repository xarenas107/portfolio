import type { NuxtConfig } from '@nuxt/schema'

export default {
	options: {
		scrollBehaviorType: 'smooth'
	}
} satisfies Partial<NuxtConfig['router']>
