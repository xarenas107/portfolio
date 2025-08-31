import type { NuxtConfig } from '@nuxt/schema'

export default {
	prerender: {
		routes: ['/'],
		crawlLinks: true
	},
	experimental: {
		openAPI: true
	}
} satisfies Partial<NuxtConfig['nitro']>
