<template lang='pug'>
primitive(as='ol' class="w-full flex group h-fit motion-reduce:overflow-auto scroll-hidden snap-x snap-mandatory" :class='[ui.base, { "flex-col": !horizontal, "items-center": !horizontal && alternate }]' :data-orientation="orientation")
	slot(v-if='slot.default' v-for='item, index in data' :item :index :orientation :alternate :lazy)

	u-lazy(v-else v-for='item, index in data' :class='{ grow: index + 1 === items.length }' :disabled='!lazy' class="flex" as='li')
		timeline-item(
			v-model:progress="percents[index]"
			:title='item[titleKey]'
			:subtitle='item[subtitleKey]'
			:badge='item[badgeKey]'
			:current='item?.current'
			:content='item[contentKey]'
			:startAt='item.startAt'
			:endAt='item.endAt'
			:location="item[locationKey]"
			:key='index'
			:ui='ui.item'
			:line-start='lineStart || index !== 0'
			:line-end='lineEnd || index + 1 <  items.length'
			:grow='index + 1 >= items.length'
			:reverse='reverse ? !(index % 2): false'
			:orientation
			:alternate
			:href='item.href'
			class='snap-start min-w-max h-full'
			)
</template>

<script lang='ts' setup>
import { Primitive } from 'reka-ui'

type Item<T = any> = {
	title?: string
	subtitle?: string
	active?: boolean
	current?: boolean
	badge?: string
	time?: string
	content?: string
	location?: string
	href?: string
} & {
	[key: string]: T
}

type Props = {
	orientation?: 'vertical' | 'horizontal'
	alternate?: boolean
	reverse?: boolean
	items?: Item[]
	badgeKey?: string
	titleKey?: string
	subtitleKey?: string
	contentKey?: string
	locationKey?: string
	lineEnd?: boolean
	lineStart?: boolean
	pending?: boolean
	lazy?: boolean
	progress?: number
	ui?: {
		base?: string
		divider?: string
		dot?: {
			base?: string
			active?: string
		}
		text?: string
		badge?: Record<string, any>
	}
}

const slot = useSlots()
const props = withDefaults(defineProps<Props>(), {
	orientation: () => 'horizontal',
	badgeKey: () => 'badge',
	titleKey: () => 'title',
	subtitleKey: () => 'subtitle',
	contentKey: () => 'content',
	locationKey: () => 'location',
	lineEnd: () => false,
	lineStart: () => false,
	items: () => [],
	ui: () => ({}),
	progress: () => 0
})

const percents = computed(() => {
	const { items = [], progress = 0 } = props
	const segment = 100 / items.length

	const size = Math.floor(progress / segment)
	const rest = progress % segment
	const percents = Array.from<number>({ length: props.items.length })
	percents.fill(0)

	for (let i = 0; i < size; i++) percents[i] = 100
	if (rest > 0) percents[size] = rest

	return percents
})

const { t } = useI18n()
const horizontal = computed(() => props.orientation === 'horizontal')

const data = computed(() => {
	const placeholder = [{ title: `${t('state.loading')}...` }] as Item[]
	return props.pending ? placeholder : props.items
})

const ui = computed(() => {
	const { dot, badge } = props.ui || {}
	return {
		base: props.ui.base,
		item: {
			divider: props.ui?.divider,
			text: props.ui?.text,
			dot,
			badge: {
				base: 'text-primary-50 bg-primary-400/50 dark:bg-primary-500/50',
				...badge || {}
			},
			container: 'fade-bottom-animation'
		}
	}
})
</script>

<style lang='scss' scoped>
</style>
