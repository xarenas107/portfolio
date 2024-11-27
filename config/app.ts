import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['app']>{
	head: {
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48', media: '(prefers-color-scheme: light)' },
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon-dark.ico', sizes: '48x48', media: '(prefers-color-scheme: dark)' },

			// Preconnect and load font types
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' }
		]
	},
	meta: [
		{ name: 'description', content: 'Curriculum Vitae' }
	],
	$development: {
		head: {
			link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon - dev.svg' }]
		}
	},
	$production: {
		head: {
			link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon - adaptative.svg' }]
		}
	}
}
