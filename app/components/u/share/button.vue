<template lang='pug'>
client-only()
    template(#fallback)
        u-skeleton(class='w-8 h-8 aspect-square rounded-lg bg-neutral-300/50 dark:bg-neutral-700/50')

    u-button(@click='toggle' :label :class :aria-label='t("share.name")' icon='i-heroicons-outline:share' variant='ghost' color='neutral' size='lg' class='aspect-square hover:bg-neutral-500/10 hover:dark:bg-neutral-400/10')
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
</script>

<style lang='scss' scoped>
</style>
