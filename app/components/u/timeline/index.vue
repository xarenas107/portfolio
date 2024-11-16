<template lang='pug'>
ol(class="relative w-full flex group h-fit motion-reduce:overflow-auto scroll-hidden snap-x snap-mandatory" :class='[ui.base, { "flex-col": !horizontal, "items-center": !horizontal && alternate }]')
    slot(v-if='slot.default' v-for='item, index in data' :item :index :orientation :alternate :lazy)

    u-timeline-item(
        v-else
        v-for='item, index in data'
        v-bind='item'
        v-model:progress="percents[index]"
        :key='index' :ui='ui.item'
        :line-start='index === 0'
        :grow='index + 1 >= items.length'
        :reverse='!(index % 2)'
        :highlight="item?.highlight"
        :orientation
        :alternate
        :lazy
        class='timeline-item snap-center'
        )
</template>

<script lang='ts' setup>
type Item = {
	title?: string
	subtitle?: string
	badge?: string
	time?: string
	content?: string
	highlight?: boolean
}

type Props = {
	orientation?: 'vertical' | 'horizontal'
	alternate?: boolean
	reverse?: boolean
	items?: Item[]
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
	const { dot } = props.ui
	return {
		base: props.ui.base,
		item: {
			divider: props.ui?.divider,
			text: props.ui?.text,
			dot,
			badge: {
				color: {
					primary: {
						solid: 'text-primary-100 dark:text-primary-100 bg-primary-400 dark:bg-primary-500'
					}
				},
				...props.ui?.badge || {}
			},
			container: 'fade-bottom-animation'
		}
	}
})
</script>

<style lang='scss' scoped>
</style>
