export const useAccessibility = () => {
	const { t } = useI18n()

	const focusTrap = (element: HTMLElement) => {
		const focusableElements = element.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)
		const firstElement = focusableElements[0] as HTMLElement
		const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Tab') {
				if (event.shiftKey) {
					if (document.activeElement === firstElement) {
						event.preventDefault()
						lastElement.focus()
					}
				} else {
					if (document.activeElement === lastElement) {
						event.preventDefault()
						firstElement.focus()
					}
				}
			}
		}

		element.addEventListener('keydown', handleKeyDown)
		firstElement?.focus()

		return () => {
			element.removeEventListener('keydown', handleKeyDown)
		}
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
		const skipLink = document.createElement('a')
		skipLink.href = '#main-content'
		skipLink.textContent = t('accessibility.skipToContent')
		skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded'

		document.body.insertBefore(skipLink, document.body.firstChild)
	}

	const handleKeyboardNavigation = (callback: (direction: 'next' | 'prev') => void) => {
		const handleKeyDown = (event: KeyboardEvent) => {
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
		}

		onMounted(() => {
			document.addEventListener('keydown', handleKeyDown)
		})

		onUnmounted(() => {
			document.removeEventListener('keydown', handleKeyDown)
		})
	}

	return {
		focusTrap,
		announceToScreenReader,
		skipToContent,
		handleKeyboardNavigation
	}
} 