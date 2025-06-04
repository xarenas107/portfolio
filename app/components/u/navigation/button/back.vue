<template lang="pug">
u-button(@click='action()' :aria-label='label' icon='heroicons:arrow-left-solid' type="button" color="neutral" variant='ghost' size='lg' class='hover:bg-inverted/10 cursor-pointer focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' :label)
</template>

<script setup lang="ts">
const { t } = useI18n()

const label = computed(() => t('back.home'))
const action = () => navigateTo({ name: 'index', hash: '#portfolio' })
</script>

<style scoped>

</style>
