import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['i18n']>{
	baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
	experimental: { typedOptionsAndMessages: "all" },
	strategy: 'no_prefix',
	defaultLocale: 'en',
	lazy: true,
	locales: [
		{
			name: 'English',
			code: 'en',
			language: 'en',
			file: 'en.ts',
			isCatchallLocale: true
		},
		{
			name: 'Español',
			code: 'es',
			language: 'es',
			file: 'es.ts'
		}
	],
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
