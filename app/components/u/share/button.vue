<template lang='pug'>
client-only()
	template(#fallback)
		u-skeleton(class='size-8 aspect-square rounded-lg bg-inverted/15')

	u-tooltip(:text)
		u-button(@click='toggle' :label :aria-label='text' icon='i-heroicons-outline:share' variant='ghost' color='neutral' size='lg' :class='[{ "aspect-square place-content-center": square }]' class='hover:bg-inverted/10 cursor-pointer focus-visible:bg-inverted/10 focus:focus-visible:ring-2 focus:focus-visible:ring-inverted')
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

const { t } = useTranslation()

const text = computed(() => t('share.name'))
const label = computed(() => props.showLabel ? text.value : undefined)
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
