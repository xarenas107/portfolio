<template lang='pug'>
u-button(@click='toggle' :label :aria-label='t("resume.download")' icon="i-heroicons:arrow-down-tray-20-solid"  variant='ghost' color='neutral' size='lg' :class='[{ "aspect-square place-content-center": square }, "hover:bg-inverted/10 cursor-pointer focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"]')
</template>

<script lang='ts' setup>
type Props = {
	type?: 'button'
	showLabel?: boolean
	// class?: string | string[]
	square?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: () => 'button'
})

const { t } = useI18n()

const label = computed(() => props.showLabel ? t('resume.download') : undefined)
const { origin } = useRequestURL()
const { data } = useUser()
const { share } = useShare()

const toggle = () => {
	share({
		url: origin,
		title: data.value?.name,
		text: data.value?.job
	})
}
</script>

<style lang='scss' scoped>
</style>
