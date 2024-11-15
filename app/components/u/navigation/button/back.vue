<template lang="pug">
u-button(@click='router.back()' :label='t("back.name")' :ui icon='heroicons:arrow-left-solid' type="button" variant='ghost')
  span(class="sr-only") {{ t('back.sr') }}
</template>

<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()

const ui = {
	color: {
		primary: {
			ghost: 'text-slate-900 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
		}
	}
}
</script>

<style scoped>

</style>
