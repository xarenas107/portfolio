import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['nitro']>{
	prerender: {
		routes: ['/'],
		crawlLinks: true
	},
	experimental: {
		// websocket: true,
		openAPI: true
	},
	hub: {
		workers: true
	}
}
