import type { ObjectDirective } from 'vue'
import type { UseIntersectionObserverOptions } from '@vueuse/core'

type IntersectionObserverOptions = UseIntersectionObserverOptions & {
	once?: boolean
}

type BindingValueArray = [IntersectionObserverCallback, IntersectionObserverOptions]
type Directive = ObjectDirective<HTMLElement, IntersectionObserverCallback | BindingValueArray>

export default defineNuxtPlugin((nuxt) => {
	const directive: Directive = {
		mounted(el, binding) {
			const { modifiers, value } = binding

			const options = (typeof value === 'function' ? [value] : value) as BindingValueArray
			const [handler, { once }] = options

			options[0] = (entries, observer) => {
				const is = entries.some(entry => entry.isIntersecting)

				if (handler && !modifiers.quiet && (!modifiers.once || is)) handler(entries, observer)
				if (is && (modifiers.once ?? once)) stop()
			}

			const { stop } = useIntersectionObserver(el, ...options)
		}
	}

	nuxt.vueApp.directive('intersect', directive)
})
