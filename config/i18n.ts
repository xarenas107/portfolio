// import type { ModuleOptions } from '@nuxtjs/i18n'

// export default {
// 	// baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
// 	experimental: {
// 		typedOptionsAndMessages: 'default',
// 		// strictSeo: true,
// 		preload: true,
// 		stripMessagesPayload: true
// 	},
// 	parallelPlugin: true,
// 	autoDeclare: true,
// 	strategy: 'no_prefix',
// 	defaultLocale: 'en',
// 	locales: [
// 		{
// 			name: 'English',
// 			code: 'en',
// 			language: 'en',
// 			file: 'en.json',
// 			isCatchallLocale: true
// 		},
// 		{
// 			name: 'Español',
// 			code: 'es',
// 			language: 'es',
// 			file: 'es.json'
// 		}
// 	],
// 	langDir: 'locales',
// 	compilation: {
// 		escapeHtml: true
// 	},
// 	detectBrowserLanguage: {
// 		fallbackLocale: 'en',
// 		useCookie: true,
// 		cookieKey: 'locale',
// 		redirectOn: 'all'
// 	}
// } satisfies Partial<ModuleOptions>

import type { ModuleOptions } from 'nuxt-i18n-micro'

export default {
	// baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
	strategy: 'no_prefix',
	meta: true,
	defaultLocale: 'en',
	translationDir: 'i18n/locales',
	locales: [
		{
			name: 'English',
			code: 'en',
			dir: 'ltr',
			language: 'en',
			file: 'en.json',
			isCatchallLocale: true
		},
		{
			name: 'Español',
			code: 'es',
			dir: 'ltr',
			language: 'es',
			file: 'es.json'
		}
	],
	autoDetectLanguage: true,
	plugin: true,
	define: true,
	localeCookie: 'locale'
} satisfies Partial<ModuleOptions>
