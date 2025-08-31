import type { NuxtConfig } from '@nuxt/schema'

type ExtendConfig<T = {}> = {
	$development: Partial<T>
	$production: Partial<T>
} & Partial<T>

export default {
	head: {
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48', media: '(prefers-color-scheme: light)' },
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon-dark.ico', sizes: '48x48', media: '(prefers-color-scheme: dark)' }
		],
		htmlAttrs: {
			class: 'bg-(--ui-bg)'
		},
		meta: [
			{ name: 'description', content: 'Curriculum Vitae' }
		]
	},
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
} satisfies ExtendConfig<NuxtConfig['app']>
