import type { ObjectDirective } from 'vue'

interface UseElementHoverOptions {
	delayEnter?: number
	delayLeave?: number
	triggerOnRemoval?: boolean
}

type BindingValueFunction = (state: boolean) => void
type Directive = ObjectDirective<HTMLElement, BindingValueFunction>

export default defineNuxtPlugin((nuxt) => {
	const state = {
		active: false
	}

	const setup = (el: HTMLElement, handler: BindingValueFunction) => {
		return () => {
			handler(true)

			el.addEventListener('mouseleave', () => {
				handler(false)
			}, { once: true })
		}
	}

	const directive: Directive = {
		mounted(el, binding) {
			const handler = binding.value
			const callback = setup(el, handler)
			el.addEventListener('mouseenter', callback)
		},
		unmounted(el, binding) {
			const handler = binding.value
			const callback = setup(el, handler)
			el.removeEventListener('mouseenter', callback)
		}
	}

	nuxt.vueApp.directive('hover', directive)
})
