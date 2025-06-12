<template lang='pug'>
  primitive(:data-orientation="orientation" :class="ui?.root" :as)
    div(v-for="(item, index) in items" :key="item.value ?? index" :class="[ui?.item, item.class]" :data-state="index < currentStepIndex ? 'completed' : index === currentStepIndex ? 'active' : undefined")
      div(:class="[ui?.container, item.ui?.container]")
        u-avatar(:size :icon="item.icon" v-bind="typeof item.avatar === 'object' ? item.avatar : {}" :class="[ui?.indicator, item.ui?.indicator]" :ui="{ icon: 'text-inherit', fallback: 'text-inherit' }")
          slot(:name="item.slot ? `${item.slot}-indicator` : 'indicator'" :item)

        separator(v-if="index < items.length - 1" :class="[ui?.separator, item.ui?.separator]" :orientation)

      div(:class="[ui?.wrapper, item.ui?.wrapper]")
        div(v-if="item.date" :class="[ui?.date, item.ui?.date]")
          slot(:name="item.slot ? `${item.slot}-date` : 'date'" :item) {{ item.date }}

        div(v-if="item.title || !!slots.title" :class="[ui?.title, item.ui?.title]")
          slot(:name="item.slot ? `${item.slot}-title` : 'title'" :item) {{ item.title }}

        div(v-if="item.description || !!slots.description" :class="[ui?.description, item.ui?.description]")
          slot(:name="item.slot ? `${item.slot}-description` : 'description'" :item) {{ item.description }}
</template>

<script setup lang="ts" generic="T">
import type { AvatarProps, DynamicSlots } from '@nuxt/ui'
import { Primitive, Separator } from 'reka-ui'

type SlotProps = (props: { item: TimelineItem }) => any

type TimelineSlots<T extends TimelineItem = TimelineItem> = {
	indicator: SlotProps
	date: SlotProps
	title: SlotProps
	description: SlotProps
} & DynamicSlots<T, 'indicator' | 'date' | 'title' | 'description', { item: T }>

type TimelineItem = {
	date?: string
	title?: string
	description?: string
	icon?: string
	avatar?: AvatarProps
	value?: string | number
	slot?: string
	class?: any
	ui?: {
		container?: string
		indicator?: string
		separator?: string
		wrapper?: string
		date?: string
		title?: string
		description?: string
	}

	[key: string]: any
}

type Props = {
	as?: keyof HTMLElementTagNameMap
	items: TimelineItem[]
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	color?: 'neutral' | 'primary' | 'warning' | 'error' | 'error'
	orientation?: 'horizontal' | 'vertical'
	defaultValue?: string | number
	class?: any
	ui?: {
		title?: string
		date?: string
		item?: string
		container?: string
		description?: string
		separator?: string
		root?: string
		indicator?: string
		wrapper?: string
	}
}

const props = withDefaults(defineProps<Props>(), {
	items: () => [],
	orientation: 'vertical',
	as: 'div'
})
const slots = defineSlots()
const model = defineModel<string | number>()

const currentStepIndex = computed(() => {
	const { items, defaultValue } = props
	const value = model.value ?? defaultValue

	return ((typeof value === 'string')
		? items?.findIndex(item => item.value === value)
		: value) ?? -1
})
</script>
