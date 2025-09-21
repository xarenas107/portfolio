<template lang='pug'>
client-only()
	template(#fallback)
		u-skeleton(class='size-8 aspect-square rounded-lg bg-inverted/15')

	u-tooltip(:text)
		u-button(@click='toggle' :icon='active?.icon' :label='active?.title' :aria-label='text' variant='ghost' color='neutral' size="lg" :class='[{ "aspect-square place-content-center": square }]' class='hover:bg-inverted/10 cursor-pointer focus-visible:bg-inverted/10 focus:focus-visible:ring-2 focus:focus-visible:ring-inverted')
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

const { t } = useTranslation()
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

const text = computed(() => t('theme.name'))
const active = computed(() => {
	const item = { ...items.value.find(scheme => scheme.value === mode.value) }
	if (!props.showLabel && item) delete item.title
	return item
})

const { next } = useCycleList(['dark', 'light'], { initialValue: mode.value })
</script>
