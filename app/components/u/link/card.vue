<template lang='pug'>
u-link(:href :class='[ "flex items-center gap-2 rounded-lg p-2 max-w-full", lclass]')
    u-icon(v-if='icon' :name='icon' :class='iclass')
    u-separator(v-if='icon' orientation="vertical" class='h-full opacity-25' )

    div(class='grow truncate overflow-hidden text-ellipsis text-start')
        p(v-if='title' class='mr-2 font-bold') {{ title }}
        span(v-if='href' class='mr-2 text-sm text-neutral-500') {{ href }}
    u-icon(name='i-heroicons-outline:external-link' :class='iclass')
</template>

<script lang='ts' setup>
type Props = {
	href?: string
	title?: string
	icon?: string
}
const props = defineProps<Props>()

const show = 'hidden sm:block'
const iclass = 'h-5 w-8 display-hidden'

const lclass = computed(() => {
	const color = 'bg-neutral-950 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-700'
	if (props.href) return `${color} bg-primary-900 text-primary-200 dark:hover:bg-primary-200 dark:hover:text-primary-700`
	return color
})
</script>

<style lang='scss' scoped>
</style>
