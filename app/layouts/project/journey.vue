<template lang="pug">
section(v-if='active' class="flex flex-col gap-8")

	div(class='flex flex-col gap-2 w-full')
		h5(class='text-balance flex gap-2 font-display uppercase font-semibod text-2xl') {{ t("project.user.journey.name") }}
		nuxt-layout(name='project-section-paragraph' :description)

	div(class='overflow-auto snap-x snap-mandatory')
		table(class='text-sm table-auto flex flex-col w-max lg:w-auto max-w-7xl')
			thead(class='border-b py-2 border-neutral-400 dark:border-neutral-600')
				tr(class="gap-2 text-left grid grid-cols-6")
					th(class='snap-start snap-always') {{  t('project.user.journey.action') }}
					th(v-for="item in table?.action" class='snap-start') {{ item }}

			tbody(class='opacity-80 font-sans')
				tr(class="gap-2 py-2 border-b border-neutral-400 dark:border-neutral-600 grid grid-cols-6")
					td {{  t('project.user.journey.task') }}
					td(v-for="tasks in table?.task" class='list-decimal list-inside gap-1 text-balance')
						ul(class='list-decimal list-inside')
							li(class='list-item' v-for='task in tasks') {{ task }}

				tr(class="gap-2 py-2 border-b border-neutral-400 dark:border-neutral-600 grid grid-cols-6")
					td {{  t('project.user.journey.emotion', 2) }}
					td(v-for="emotions in table?.emotion" class='gap-1 text-balance')
						p(v-for='emotion in emotions') {{ emotion }}

				tr(class="py-2 gap-2 grid grid-cols-6")
					td {{  t('project.user.journey.opportunities', 2) }}
					td(v-for="opportunities in table?.opportunity" class='gap-1 text-balance')
						p(v-for='opportunity in opportunities') {{ opportunity }}
</template>

<script lang="ts" setup>
type Props = {
	description?: string
	active?: boolean
	table: {
		action?: string[][]
		task?: string[]
		emotion?: string[]
		opportunity?: string[]
	}
}

const props = withDefaults(defineProps<Props>(), {
})

const { t } = useI18n()
</script>

<style lang="scss" scoped>
</style>
