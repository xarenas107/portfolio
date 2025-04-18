<template lang="pug">
div
	client-only
		template(#fallback)
			u-skeleton(class='min-w-28 h-8 rounded-lg bg-neutral-300/50 dark:bg-neutral-700/50')

		a(@click='click' :href :aria-current :class='[state]' class="rounded-lg px-3 py-2 flex gap-1.5 text-sm font-medium cursor-pointer")
			u-icon(v-if='icon' :name='icon' class='w-5 h-5 flex-shrink-0 relative' ref='link')
			span(v-if='text') {{ text }}
</template>

<script setup lang="ts">
type Emit = {
	(event: 'click', value: MouseEvent): void
}
type Props = {
	href?: string
	icon?: string
	text?: string
	active?: boolean
	ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean
	kbds?: string[]
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	ariaCurrent: () => false
})

const state = computed(() => {
	return props.active
		? 'bg-primary-500/10 dark:bg-primary-400/10 text-primary-500 dark:text-primary-400 hover:bg-primary-500/20 hover:dark:bg-primary-500/20'
		: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-700 hover:dark:text-neutral-200 hover:bg-neutral-500/10 hover:dark:bg-neutral-400/10'
})

const click = (event: MouseEvent) => emit('click', event)

const element = useTemplateRef('link')

const { current } = useMagicKeys({
	passive: false,
	onEventFired(event) {
		if (props.active) return

		const is = props.kbds?.every(value => current.has(value.toLowerCase()))
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
