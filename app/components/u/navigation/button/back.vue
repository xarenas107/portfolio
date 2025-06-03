<template lang="pug">
u-button(@click='action()' :aria-label='label' icon='heroicons:arrow-left-solid' type="button" color="neutral" variant='ghost' size='lg' class='hover:bg-neutral-500/10 hover:dark:bg-neutral-400/10' :label)
</template>

<script setup lang="ts">
const { t } = useI18n()

const label = computed(() => t('back.home'))
const action = () => navigateTo({ name: 'index', hash: '#portfolio' })
</script>

<style scoped>

</style>
