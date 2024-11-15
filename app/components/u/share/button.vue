<template lang='pug'>
client-only()
    template(#fallback)
        u-skeleton(class='w-8 h-8 rounded-lg bg-slate-300/50 dark:bg-slate-700/50')

    u-button(@click='toggle' :ui :label :class :aria-label='t("share.name")' icon='i-heroicons-outline:share' variant='ghost')
</template>

<script lang='ts' setup>
type Props = {
	type?: 'button'
	showLabel?: boolean
	class?: string | string[]
}

const props = withDefaults(defineProps<Props>(), {
	type: () => 'button'
})

const { t } = useI18n()

const label = computed(() => props.showLabel ? t('share.name') : undefined)
const { origin } = useRequestURL()
const user = useUser()

const toggle = () => {
	navigator.share({
		url: origin,
		title: user.data?.name,
		text: user.data?.job
	})
}

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
