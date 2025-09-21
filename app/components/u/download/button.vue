<template lang='pug'>
u-tooltip(v-if='data.resume?.href' :text)
	u-button(:href='data.resume.href' :aria-label='text' :download="data.resume.name" :label icon="i-heroicons:arrow-down-tray-20-solid" variant='ghost' color='neutral' size='lg' :class='{ "aspect-square place-content-center": square }' class='hover:bg-inverted/10 cursor-pointer focus-visible:bg-inverted/10 focus:focus-visible:ring-2 focus:focus-visible:ring-inverted' as="a" loading-auto)
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

const text = computed(() => t('resume.download'))
const label = computed(() => props.showLabel ? text.value : undefined)
const { data } = useUser()
</script>
