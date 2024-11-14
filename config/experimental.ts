import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['experimental']>{
	asyncEntry: true,
	typedPages: true,
	viewTransition: true,
	writeEarlyHints: true,
}
