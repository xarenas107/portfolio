import type { NuxtConfig } from '@nuxt/schema'

export default {
	// asyncEntry: true,
	typedPages: true,
	viewTransition: true,
	writeEarlyHints: true,
	cookieStore: true,
	// cookieStore: true,
	asyncContext: true
	// buildCache: true,
	// lazyHydration: true
} satisfies NuxtConfig['experimental']
