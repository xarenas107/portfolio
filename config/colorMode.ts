import type { ModuleOptions } from '@nuxtjs/color-mode'

export default {
	storageKey: 'color-scheme',
	fallback: 'dark',
	preference: 'system'
} satisfies Partial<ModuleOptions>
