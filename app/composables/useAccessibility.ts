export const useAccessibility = () => {
	const { t } = useTranslation()

	const focusTrap = (element: HTMLElement) => {
		if (!import.meta.client) return

		const list = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		const elements = element.querySelectorAll<HTMLElement>(list)
		const firstElement = elements[0]

		const unwatch = useEventListener('keydown', (event) => {
			const last = elements.length - 1
			const lastElement = elements[last]
			const { activeElement } = document
			const { key, shiftKey } = event

			if (key === 'Tab') {
				if (shiftKey) {
					if (activeElement === firstElement) {
						event.preventDefault()
						lastElement?.focus()
					}
				} else {
					if (activeElement === lastElement) {
						event.preventDefault()
						firstElement?.focus()
					}
				}
			}
		})

		firstElement?.focus()
		return unwatch
	}

	const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
		if (!import.meta.client) return

		const announcement = document.createElement('div')
		announcement.setAttribute('aria-live', priority)
		announcement.setAttribute('aria-atomic', 'true')
		announcement.className = 'sr-only'
		announcement.textContent = message

		document.body.appendChild(announcement)

		setTimeout(() => {
			document.body.removeChild(announcement)
		}, 1000)
	}

	const skipToContent = () => {
		if (!import.meta.client) return
		const target = document.querySelector('a[href="#main-content"]')
		if (target) return

		const skipLink = document.createElement('a')
		skipLink.href = '#main-content'
		skipLink.textContent = t('accessibility.skipToContent')
		skipLink.classList.add('sr-only', 'focus:not-sr-only')
		document.body.insertBefore(skipLink, document.body.firstChild)
	}

	const handleKeyboardNavigation = (callback: (direction: 'next' | 'prev') => void) => {
		if (!import.meta.client) return

		const unwatch = useEventListener('keydown', (event) => {
			switch (event.key) {
				case 'ArrowRight':
				case 'ArrowDown':
					event.preventDefault()
					callback('next')
					break
				case 'ArrowLeft':
				case 'ArrowUp':
					event.preventDefault()
					callback('prev')
					break
			}
		})
		onBeforeUnmount(() => unwatch())
	}

	return {
		focusTrap,
		announceToScreenReader,
		skipToContent,
		handleKeyboardNavigation
	}
}
