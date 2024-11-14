type TEvent = UIEvent | MouseEvent | Event
type CallbackTransition = <T>(event?: T) => void | Promise<void>

export default <T = TEvent>(callback?: CallbackTransition, event?: T) => {
	if (!import.meta.client) return
	const isViewTransition = 'startViewTransition' in document
	const isPreferredReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	
	if (!isViewTransition || isPreferredReducedMotion) {
		if (callback) callback<T>(event)
		return
	}

	return document?.startViewTransition?.(async () => {
		if (callback) await callback<T>()
		await nextTick()
	})
}
