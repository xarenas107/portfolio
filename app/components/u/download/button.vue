<template lang='pug'>
u-tooltip(:text)
	u-button(v-if='data.resume?.href' :label :href='data.resume.href' :aria-label='text' :download="data.resume.name" icon="i-heroicons:arrow-down-tray-20-solid" variant='ghost' color='neutral' size='lg' :class='{ "aspect-square place-content-center": square }' class='"hover:bg-inverted/10 cursor-pointer focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"' as="a" loading-auto)
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

const text = computed(() => t('resume.download'))
const label = computed(() => props.showLabel ? text.value : undefined)
const { data } = useUser()
</script>

<style lang='scss' scoped>
</style>
