export const usePerformance = () => {
	const metrics = reactive({
		pageLoadTime: 0,
		firstContentfulPaint: 0,
		largestContentfulPaint: 0,
		cumulativeLayoutShift: 0
	})

	const measurePageLoad = () => {
		if (!import.meta.client) return

		const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
		if (navigation) {
			metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart
		}
	}

	const measureWebVitals = () => {
		if (!import.meta.client) return

		// First Contentful Paint
		new PerformanceObserver((list) => {
			const entries = list.getEntries()
			const fcp = entries[entries.length - 1]
			metrics.firstContentfulPaint = fcp?.startTime ?? 0
		}).observe({ entryTypes: ['paint'] })

		// Largest Contentful Paint
		new PerformanceObserver((list) => {
			const entries = list.getEntries()
			const lcp = entries[entries.length - 1]
			metrics.largestContentfulPaint = lcp?.startTime ?? 0
		}).observe({ entryTypes: ['largest-contentful-paint'] })

		// Cumulative Layout Shift
		new PerformanceObserver((list) => {
			let cls = 0
			for (const entry of list.getEntries()) {
				// @ts-expect-error Unknown performance option key
				if (!entry?.hadRecentInput) cls += (entry as any).value
			}
			metrics.cumulativeLayoutShift = cls
		}).observe({ entryTypes: ['layout-shift'] })
	}

	const logMetrics = () => {
		console.log('Performance Metrics:', {
			'Page Load Time': `${metrics.pageLoadTime.toFixed(2)}ms`,
			'First Contentful Paint': `${metrics.firstContentfulPaint.toFixed(2)}ms`,
			'Largest Contentful Paint': `${metrics.largestContentfulPaint.toFixed(2)}ms`,
			'Cumulative Layout Shift': metrics.cumulativeLayoutShift.toFixed(3)
		})
	}

	onMounted(() => {
		measurePageLoad()
		measureWebVitals()

		// Log metrics after page load
		setTimeout(logMetrics, 1000)
	})

	return {
		metrics: readonly(metrics),
		logMetrics
	}
}
