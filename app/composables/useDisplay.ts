import { breakpointsTailwind } from '@vueuse/core'

interface DisplayPlatform {
	android: boolean
	ios: boolean
	cordova: boolean
	electron: boolean
	chrome: boolean
	edge: boolean
	firefox: boolean
	opera: boolean
	win: boolean
	mac: boolean
	linux: boolean
	touch: boolean
	// ssr: boolean
}

interface DisplayInstance {
	height: Ref<number>
	width: Ref<number>
	platform: Ref<DisplayPlatform>
	thresholds: Ref<typeof breakpointsTailwind>
}

function getPlatform() {
	const { navigator } = import.meta.client ? window : {}
	const { userAgent = '' } = navigator || {}
	const { maxTouchPoints = 0 } = navigator ?? {}

	const match = (regexp: RegExp) => Boolean(userAgent.match(regexp))

	const android = match(/android/i)
	const ios = match(/iphone|ipad|ipod/i)
	const cordova = match(/cordova/i)
	const electron = match(/electron/i)
	const chrome = match(/chrome/i)
	const edge = match(/edge/i)
	const firefox = match(/firefox/i)
	const opera = match(/opera/i)
	const win = match(/win/i)
	const mac = match(/mac/i)
	const linux = match(/linux/i)
	const touch = import.meta.client && ('ontouchstart' in window || maxTouchPoints > 0)

	return {
		android,
		ios,
		cordova,
		electron,
		chrome,
		edge,
		firefox,
		opera,
		win,
		mac,
		linux,
		touch
	}
}

const getClientWidth = () => {
	if (import.meta.server || !window) return 0
	return window.innerWidth
}

const getClientHeight = () => {
	if (import.meta.server || !window) return 0
	return window.innerHeight
}

export default () => {
	const breakpoints = useBreakpoints(breakpointsTailwind)
	const mobile = breakpoints.smaller('lg')
	const platform = shallowRef(getPlatform())
	const width = shallowRef(getClientWidth())
	const height = shallowRef(getClientHeight())

	const state = reactive({} as DisplayInstance)

	function updateSize() {
		height.value = getClientHeight()
		width.value = getClientWidth()
		platform.value = getPlatform()
	}

	watchEffect(() => {
		state.height = height.value
		state.width = width.value
		state.platform = platform.value
		state.thresholds = breakpointsTailwind
	})

	useEventListener('resize', updateSize, { passive: true })

	return {
		mobile: readonly(mobile),
		desktop: computed(() => !mobile.value),
		...toRefs(state),
		...breakpoints
	}
}
