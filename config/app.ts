import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['app']>{
	head: {
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },

			// Preconnect and load font types
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap' }
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
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon - adaptative.svg' },
				{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon - light.svg', media: '(prefers-color-scheme: light)' },
				{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon - dark.svg', media: '(prefers-color-scheme: dark)' }
			]
		}
	}
}
