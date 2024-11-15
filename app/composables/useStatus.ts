import type { AsyncDataRequestStatus } from '#app'

export default (status: Ref<AsyncDataRequestStatus>) => {
	return {
		idle: computed(() => status.value === 'idle'),
		pending: computed(() => status.value === 'pending'),
		error: computed(() => status.value === 'error'),
		success: computed(() => status.value === 'success')
	}
}
