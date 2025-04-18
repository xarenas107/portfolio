import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition
		if (!to.hash) return { top: 0 }
	}
}
