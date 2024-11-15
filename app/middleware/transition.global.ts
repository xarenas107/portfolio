export default defineNuxtRouteMiddleware((to) => {
	if (import.meta.server || !document.startViewTransition) return
	to.meta.pageTransition = to.meta.layoutTransition = false
})
