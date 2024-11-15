<template lang='pug'>
u-link(:href class='p-0')
    u-badge(:ui='ui.badge' variant='soft' size='md')
        u-icon(v-if='icon' :name='icon' :class='ui.icon')
        u-divider(v-if='icon' orientation="vertical" class='h-full opacity-25' )

        p(v-if='title' class='mr-2 font-bold') {{ title }}
        //- u-icon(name='i-heroicons-outline:external-link' :class='ui.icon')
</template>

<script lang='ts' setup>
type Props = {
	href?: string
	title?: string
	icon?: string
}
const props = defineProps<Props>()

const show = 'hidden sm:block'

const lclass = computed(() => {
	const color = 'bg-slate-900 text-slate-200 dark:bg-slate-200 dark:text-slate-700'
	if (props.href) return `${color} bg-primary-900 text-primary-200 dark:hover:bg-primary-200 dark:hover:text-primary-700`
	return color
})

const ui = {
	icon: 'h-4 w-4',
	badge: {
		base: `w-fit h-fit text-nowrap gap-1`,
		color: {
			primary: {
				soft: `ring-1 ring-inset text-primary-600 hover:text-primary-700 dark:text-primary-600 dark:hover:text-primary-500 ring-primary-600 hover:ring-primary-600  dark:ring-slate-700 dark:hover:ring-slate-600 bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700`
			}
		}
	}
}
</script>

<style lang='scss' scoped>
</style>
