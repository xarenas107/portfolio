import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['i18n']>{
	baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
	experimental: { typedOptionsAndMessages: 'all' },
	strategy: 'no_prefix',
	defaultLocale: 'en',
	lazy: true,
	locales: [
		{
			name: 'English',
			code: 'en',
			language: 'en',
			file: 'en.json',
			isCatchallLocale: true
		},
		{
			name: 'Español',
			code: 'es',
			language: 'es',
			file: 'es.json'
		}
	],
	bundle: {
		optimizeTranslationDirective: false
	},
	langDir: 'locales',
	compilation: {
		escapeHtml: true
	},
	detectBrowserLanguage: {
		fallbackLocale: 'en',
		useCookie: true,
		cookieKey: 'locale',
		redirectOn: 'root'
	}
}
