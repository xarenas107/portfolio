import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { createResolver } from '@nuxt/kit'
import { loadConfig } from 'c12'

import type { ConfigLayerMeta, InputConfig } from 'c12'
import type { NuxtConfig } from 'nuxt/schema'

async function defineNuxtConfig(input: InputConfig<NuxtConfig, ConfigLayerMeta>) {
	const { resolve } = createResolver('./')
	const dir = resolve('config')

	const options: Record<string, unknown> = {}

	if (existsSync(dir)) {
		const entries = await readdir(dir, { withFileTypes: true })

		for (const entry of entries) {
			if (entry.isFile()) {
				const regex = /\.(?:mts|cts|ts|mjs|cjs|js)$/
				const key = entry.name.replace(regex, '')

				// Resolve configuration
				const { config } = await loadConfig({
					cwd: dir,
					configFile: entry.name,
					omit$Keys: true,
					// @ts-expect-error Unknown nuxt option key
					defaults: input[key]
				})

				options[key] = config
			}
		}
	}

	return {
		...input,
		...options
	}
}

export default defineNuxtConfig({
	modules: [
		'@nuxt/devtools',
		'@nuxt/ui',
		'@vueuse/nuxt',
		'@nuxt/image',
		'@nuxt/content',
		'@nuxtjs/i18n',
		'nuxt-seo-utils',
		'@nuxthub/core',
		'@nuxtjs/robots',
		'@nuxtjs/sitemap',
		'nuxt-og-image',
		'nuxt-link-checker'
	],
	ssr: false,
	imports: {
		dirs: ['./stores']
	},
	devtools: {
		enabled: true,
		vscode: {
			enabled: true
		}
	},
	css: ['~/assets/css/main.css'],
	future: {
		compatibilityVersion: 4
	},
	compatibilityDate: '2025-07-20'
})
