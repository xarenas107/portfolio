import type { ObjectDirective } from 'vue'

interface UseElementHoverOptions {
	delayEnter?: number
	delayLeave?: number
	triggerOnRemoval?: boolean
}

type BindingValueFunction = (state: boolean) => void
type Directive = ObjectDirective<HTMLElement, BindingValueFunction | [handler: BindingValueFunction, options: UseElementHoverOptions]>

export default defineNuxtPlugin((nuxt) => {
	const directive: Directive = {
		mounted(el, binding) {
			const value = binding.value
			if (typeof value === 'function') {
				const isHovered = useElementHover(el)
				watch(isHovered, v => value(v))
			} else {
				const [handler, options] = value
				const isHovered = useElementHover(el, options)
				watch(isHovered, v => handler(v))
			}
		}
	}

	nuxt.vueApp.directive('hover', directive)
})
