import type { NuxtConfig } from '@nuxt/schema'

export default {
	plugins: [],
	optimizeDeps: {
		include: ['@vue/devtools-core', '@vue/devtools-kit', 'tailwindcss/colors', 'reka-ui', 'motion-v']
	}
} satisfies Partial<NuxtConfig['vite']>
