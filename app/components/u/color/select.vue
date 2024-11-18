<template lang='pug'>
client-only()
    template(#fallback)
        u-skeleton(class='w-8 h-8 rounded-lg bg-slate-300/50 dark:bg-slate-700/50')

    u-popover(:items="items")
        u-button(:ui :label='active?.title' :aria-label="t('color.option', 2)" variant='ghost' color='primary' icon="i-heroicons-outline:color-swatch" class='w-full' ref='element')

        template(#panel)
            div(class='flex flex-wrap gap-1.5 p-2 max-w-28 w-max')
                u-color-button(v-for='item in items' @change='toggle' :color='item.color' :active='item.active')
</template>

<script lang='ts' setup>
type Props = {
	showLabel?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const app = useAppConfig()

const ui = {
	icon: {
		base: 'text-primary-600 dark:text-primary-600 hover:text-primary-700 hover:dark:text-primary-300'
	},
	color: {
		primary: {
			ghost: 'hover:bg-primary-300/50 hover:dark:bg-primary-600/50 text-primary-700 dark:text-primary-300 hover:text-primary-900 hover:dark:text-primary-100'
		}
	}
}

const colors = ['slate', 'orange', 'yellow', 'emerald', 'indigo', 'rose']

const items = computed(() => {
	return [...colors].map(color => ({
		active: app.ui.primary === color,
		title: t(`color.${color}`),
		color
	}))
})

const active = computed(() => {
	const item = items.value.find(item => item.active)
	if (!props.showLabel && item) item.title = ''
	return item
})

const target = useTemplateRef('element')
const toggle = (value: string) => {
	if (app.ui.primary === value) return

	const element = target.value?.$el
	useRadialTransition(element, () => {
		app.ui.primary = value
	})
}
</script>

<style lang='scss' scoped>
</style>
