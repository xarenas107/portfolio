import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['colorMode']>{
	storageKey: 'color-scheme',
	fallback: 'dark',
	preference: 'system'
}
