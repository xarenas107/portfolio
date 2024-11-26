<template lang="pug">
client-only
  template(#fallback)
    u-skeleton(class='min-w-28 h-8 rounded-lg bg-slate-300/50 dark:bg-slate-700/50')

  a(@click='click' :href :aria-current :class='[state]' class="rounded-lg px-3 py-2 flex gap-1.5 text-sm font-medium cursor-pointer")
    u-icon(v-if='icon' :name='icon' class='w-5 h-5 flex-shrink-0 relative' ref='link')
    span(v-if='label') {{ label }}
</template>

<script setup lang="ts">
type Emit = {
	(event: 'click', value: MouseEvent): void
}
type Props = {
	href?: string
	icon?: string
	label?: string
	active?: boolean
	ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean
	shortcut?: string[]
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	ariaCurrent: () => false
})

const state = computed(() => {
	return props.active
		? 'bg-primary-200/50 text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200 hover:bg-primary-300/50 dark:bg-primary-600/50 hover:dark:bg-primary-500/50'
		: 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:dark:text-slate-100 hover:bg-slate-300/50 hover:dark:bg-slate-700/50'
})

const click = (event: MouseEvent) => emit('click', event)

const element = useTemplateRef('link')

const { current } = useMagicKeys({
	passive: false,
	onEventFired(event) {
		if (props.active) return

		const is = props.shortcut?.every(value => current.has(value.toLowerCase()))
		if (is && event.type === 'keydown') {
			event.preventDefault()
			const link = element.value?.$el as HTMLButtonElement
			link?.click()
		}
	}
})
</script>

<style scoped>

</style>
