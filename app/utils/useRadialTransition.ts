type CallbackTransition = <T>(event?: T) => void | Promise<void>

export default <T extends HTMLElement | EventTarget | null | undefined>(target: T, callback?: CallbackTransition) => {
	const transition = useViewTransition(() => callback?.(target))

	transition?.ready.then(() => {
		const element = target as HTMLElement
		const { top, left, width, height } = element?.getBoundingClientRect() || {}
		const x = left + width / 2
		const y = top + height / 2

		const right = window.innerWidth - left
		const bottom = window.innerHeight - top
		const radius = Math.hypot(Math.max(left, right), Math.max(top, bottom))

		const clipPath = [
			`circle(0px at ${x}px ${y}px)`,
			`circle(${radius}px at ${x}px ${y}px)`
		]

		document.documentElement.animate({ clipPath }, {
			duration: 500,
			pseudoElement: '::view-transition-new(root)',
			easing: 'ease-in-out'
		})
	})
}
