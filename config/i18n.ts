import type { ModuleOptions } from '@nuxtjs/i18n'

export default {
	baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
	experimental: { typedOptionsAndMessages: 'all' },
	strategy: 'no_prefix',
	defaultLocale: 'en',
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
} satisfies Partial<ModuleOptions>
