<template lang="pug">
u-button(@click='router.back()' :label='t("back.name")' icon='heroicons:arrow-left-solid' type="button" color="neutral" variant='ghost' class='aspect-square')
  span(class="sr-only") {{ t('back.sr') }}
</template>

<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()

const ui = {
	color: {
		primary: {
			ghost: 'text-neutral-900 dark:text-neutral-300 hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 hover:text-neutral-900 dark:hover:text-neutral-100'
		}
	}
}
</script>

<style scoped>

</style>
