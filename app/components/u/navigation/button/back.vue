<template lang="pug">
u-button(@click='router.back()' :aria-label='t("back.sr")' icon='heroicons:arrow-left-solid' type="button" color="neutral" variant='ghost' size='lg' class='aspect-square hover:bg-neutral-500/10 hover:dark:bg-neutral-400/10')
</template>

<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<style scoped>

</style>
