<template lang='pug'>

u-link(:to='href' :class='["flex items-center gap-2", classes]' :disabled='disabled || !href' target="_blank")
    u-icon(v-if='icon' :name='icon' class='h-6 w-6')
    span(v-if='title') {{ title }}
</template>

<script lang='ts' setup>
type Props = {
	href?: string
	title?: string
	icon?: string
    disabled?: boolean
    ui?: {
        text?: string
    }
}
const props  = defineProps<Props>()

const classes = computed(() => {
    const {
        text = 'text-base text-slate-700 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-500'
    } = props.ui || {}


    if (props.disabled || !props.href) return 'opacity-50 pointer-events-none'
    return text
})
</script>

<style lang='scss' scoped>
</style>
