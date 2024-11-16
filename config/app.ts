import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['app']>{
	head: {
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },

			// Preconnect and load font types
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet' }
		]
	},
	meta: [
		{ name: 'description', content: 'Curriculum Vitae' }
	]
	// $development: {
	// 	head: {
	// 		link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon - dev.svg' }]
	// 	}
	// }
	// $production: {
	// 	head: {
	// 		link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon - adaptative.svg' }]
	// 	}
	// }
}
