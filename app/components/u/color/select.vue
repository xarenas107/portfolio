<template lang='pug'>
client-only()
	template(#fallback)
		u-skeleton(class='w-8 h-8 aspect-square rounded-lg bg-inverted/50')
	u-tooltip(:text :open='hover')
		u-popover(:items)
			div(v-hover='change')
				u-button(:label='active?.title' :aria-label="text" variant='ghost' color='primary' size="lg" icon="i-heroicons-outline:color-swatch" :class='{ "aspect-square place-content-center": square }' class='hover:bg-primary/10 cursor-pointer focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' ref='button')

			template(#content)
				div(class='flex flex-wrap gap-1.5 p-2 max-w-28 w-max' ref='element')
					u-color-button(v-for='item in items' @change='toggle' :color='item.color' :active='item.active') {{ item }}
</template>

<script lang='ts' setup>
type Props = {
	showLabel?: boolean
	square?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const app = useAppConfig()
const colors = ['slate', 'orange', 'yellow', 'emerald', 'indigo', 'rose']

const text = computed(() => t('color.option', 2))
const items = computed(() => {
	return [...colors].map(color => ({
		active: app.ui.colors.primary === color,
		title: t(`color.${color}`),
		color
	}))
})

const active = computed(() => {
	const item = { ...items.value.find(item => item.active) }
	if (!props.showLabel && item) delete item.title
	return item
})

const target = useTemplateRef('element')
const toggle = (value: string) => {
	if (app.ui.colors.primary === value) return

	const element = target.value
	useRadialTransition(element, () => {
		app.ui.colors.primary = value
	})
}

const change = (value: boolean) => hover.value = value
const hover = shallowRef(false)
</script>

<style lang='scss' scoped>
</style>
