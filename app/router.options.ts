import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
	scrollBehaviorType: 'auto',
	scrollBehavior(to, from, position) {
		if (to.hash) {
			const hash = useState('to:hash', () => to.hash)
			callOnce(() => hash.value = to.hash)
		}

		if (position) return position
		if (!to.hash) return { top: 0 }
		if (to.name !== from.name) {
			return {
				behavior: 'auto',
				el: to.hash
			}
		}
	}
}
