import type { NuxtConfig } from '@nuxt/schema'

export default {
	head: {
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48', media: '(prefers-color-scheme: light)' },
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon-dark.ico', sizes: '48x48', media: '(prefers-color-scheme: dark)' }
		],
		rootAttrs: {
			class: 'bg-(--ui-bg)'
		}
	},
	meta: [
		{ name: 'description', content: 'Curriculum Vitae' }
	],
	$development: {
		head: {
			link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon-dev.svg' }]
		}
	},
	$production: {
		head: {
			link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon-adaptative.svg' }]
		}
	}
} satisfies Partial<NuxtConfig['app']>
