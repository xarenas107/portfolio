<template lang="pug">
section(class="flex flex-col gap-16 relative")
	nuxt-layout(v-if='title || description' name='project-section-paragraph' :title :description :content :columns small-title)

	div(class='grid gap-x-16 items-stretch w-full content-between relative rounded-lg gap-4 bg-elevated p-4 lg:p-8 ring')
		div(v-for='[keys, value] in sliders' class='flex gap-4 items-center')
			div(
				v-for='key, index in keys'
				class='text-muted text-base'
				:class='{ "order-1": index > 0, "font-medium text-highlighted": value >= 50 && index > 0 || value < 50 && index === 0 }'
			) {{ key }}

			//- u-progress(:model-value='value' :max='100' class='grow')

			div(class='h-2 w-full flex gap-2')
				span(class='h-full w-(--width) max-w-full bg-primary rounded-full' :style='{ "--width": `${value}%` }')
				span(class='h-full bg-accented grow rounded-full')
	</template>

<script lang="ts" setup>
type Props = {
	title?: string
	description?: string
	detail?: boolean
	background?: string
	sliders: [string[], number][]
	columns?: number
	content?: string
}

defineProps<Props>()
</script>
