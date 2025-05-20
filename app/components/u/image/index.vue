<template lang='pug'>
u-placeholder(v-if='pending' :class :ui='ui.placeholder' :pending)
div(v-else :class class='overflow-hidden ring ring-neutral-400 ring-inset dark:ring-neutral-600')
	img(@load='show' :class='contentClass' :src='data' :alt loading='lazy')
</template>

<script lang='ts' setup>
import type { TransitionProps } from 'vue'

type Props = {
	src?: string
	alt?: string
	class?: string
	contentClass?: string
	transition?: TransitionProps
	ui?: {
		placeholder?: {
			svg?: {
				base?: string
				opacity?: string | number
			}
		}
	}
}

const props = withDefaults(defineProps<Props>(), {
	transition: () => ({ name: 'transition-fade' }),
	src: () => '/',
	ui: () => ({
		alt: () => '',
		placeholder: {
			svg: {
				base: 'bg-(--ui-text) stroke-neutral-600 dark:stroke-neutral-200'
			}
		}
	})
})

const { data, execute } = useLazyAsyncData(props.src, async () => {
	const blob = await $fetch<Blob>(props.src)
	const src = new File([blob], props.src, { type: blob?.type })
	const data = URL.createObjectURL(src)
	pending.value = false
	return data
}, {
	immediate: false
})

// const transition = computed(() => {
// 	const { transition } = props
// 	if (!transition) return undefined
// 	return typeof transition === 'string' ? { name: transition } : transition
// })

onMounted(() => execute())

const pending = shallowRef(true)
const show = () => pending.value = false
</script>

<style lang='scss' scoped>
</style>
