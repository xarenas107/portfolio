import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['nitro']>{
	prerender: {
		routes: ['/'],
		crawlLinks: true
	},
	experimental: {
		websocket: true
	},
	hub: {
		workers: true
	}
}
