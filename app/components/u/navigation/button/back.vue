<template lang="pug">
u-tooltip(:text :disabled="showLabel")
	u-button(@click='action()' :aria-label='text' icon='heroicons:arrow-left-solid' type="button" color="neutral" variant='ghost' size='lg' class='hover:bg-inverted/10 cursor-pointer focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' :label='text')
</template>

<script setup lang="ts">
type Props = {
	showLabel?: boolean
}

withDefaults(defineProps<Props>(), {
	showLabel: true
})

const { t } = useI18n()

const text = computed(() => t('back.home'))
const action = () => navigateTo({ name: 'index', hash: '#portfolio' })
</script>

<style scoped>

</style>
