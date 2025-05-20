<template lang='pug'>
client-only()
    template(#fallback)
        u-skeleton(class='w-8 h-8 aspect-square rounded-lg bg-(--ui-text)/50')

    u-button(@click='toggle' :icon='active?.icon' :label='active?.title' :aria-label='t("theme.name")' variant='ghost' color='neutral' size="lg" :class='[{ "aspect-square place-content-center": square }, "hover:bg-(--ui-text)/10"]')
</template>

<script lang='ts' setup>
type Props = {
	type?: 'button'
	showLabel?: boolean
	square?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: () => 'button'
})

const { t } = useI18n()
const mode = useTheme()

const items = computed(() => [
	{ icon: 'i-line-md:sunny', value: 'light', title: t('theme.light') },
	{ icon: 'i-line-md:light-dark', value: 'system', title: t('theme.system') },
	{ icon: 'i-line-md:moon', value: 'dark', title: t('theme.dark') }
])

const toggle = (event?: MouseEvent) => {
	const theme = next()
	if (mode.preference === theme) return

	useRadialTransition(event?.target, () => {
		mode.preference = theme
	})
}

const active = computed(() => {
	const item = { ...items.value.find(scheme => scheme.value === mode.value) }
	if (!props.showLabel && item) delete item.title
	return item
})

const { next } = useCycleList(['dark', 'light'], { initialValue: mode.value })
</script>

<style lang='scss' scoped>
</style>
