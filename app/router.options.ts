import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
	scrollBehavior(to, from, position) {
		if (import.meta.server) {
			const hash = useState('to:hash', () => to.hash)
			if (to.hash) callOnce(() => hash.value = to.hash)
		}

		if (position) return position
		if (!to.hash) return { top: 0 }
	}
}
