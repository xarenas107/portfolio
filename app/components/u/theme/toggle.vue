<template lang='pug'>
client-only()
    template(#fallback)
        u-skeleton(class='w-8 h-8 rounded-lg bg-slate-300/50 dark:bg-slate-700/50')

    u-button(@click='toggle' :ui :icon='active?.icon' :label='active?.title' :aria-label='t("theme.name")' variant='ghost')
</template>
<script lang='ts' setup>
type Props = {
    type?: "button",
    showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: () => 'button',
})

const { t } = useI18n()
const mode = useTheme()

const items = computed(() => [
    { icon: 'i-line-md:sunny', value: 'light', title: t('theme.light')  },
    { icon: 'i-line-md:light-dark', value: 'system', title: t('theme.system')  },
    { icon: 'i-line-md:moon', value: 'dark', title: t('theme.dark')  },
])


const toggle = (event?: MouseEvent) => {
    const theme = next()
    if (mode.preference === theme) return

	useRadialTransition(event?.target, () => {
		mode.preference = theme
	})
}

const active = computed(() => {
    const item = items.value.find(scheme => scheme.value === mode.value)
    if (!props.showLabel && item) item.title = ''
    return item
})

const { next } = useCycleList([ 'dark', 'light'], { initialValue: mode.value })

const ui = {
    color: {
        primary: {
            ghost: 'text-slate-900 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
        }
    }
}

</script>

<style lang='scss' scoped>
</style>
