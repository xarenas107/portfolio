<template lang="pug">
section(v-if='active' class="flex flex-col gap-8")
	//- User persona
	article(class='flex flex-col gap-10')
		div(class='flex flex-col gap-2 w-full')
			h5(class='text-balance flex gap-2 font-display uppercase font-semibold text-2xl') {{ t("project.user.persona.name") }}
			nuxt-layout(name='project-section-paragraph' :description)

		//- u-card(variant='soft' class='bg-elevated')
		//- 	template(#header)
		div(class='flex flex-col sm:flex-row gap-6 sm:items-center max-w-prose')
			img(v-if='image' :alt="t('project.user.persona.name')" :src="image" class='h-32 w-32 aspect-square rounded-lg object-center object-cover ring' loading='lazy')

			div(class='flex flex-col gap-2 text-balance')
				h4(class='text-xl font-medium flex items-center') {{ user }}
				blockquote(class='italic text-muted') "{{ quote }}"
				p(class='text-base text-toned') {{ summary }}

		//- div(class='grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 gap-4')
			nuxt-layout(name='project-section-card' v-for='item in group' variant='solid' :title="item.title" class='text-highlighted')
				ul(class='text-base list-inside flex flex-col gap-2 text-balance text-toned')
					li(v-for='content in item.content') {{ content }}

		u-card-group(:ui='ui.card' as='div')
			template(#default='{ childClass, containerClass }')
				div(class='grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none')
					ul(v-for='item, index in group' :class='[containerClass]')
						u-card(:class='[item.highlighted ? "h-full bg-default text-highlighted" : childClass]' as='li' variant='solid')
							template(#header)
								div(class='flex gap-4 items-center')
									u-icon(:name='item.icon' class='size-8')
									h4(class='text-2xl font-semibold flex items-center font-display') {{ item?.title }}

							ul(class='text-base flex flex-col gap-2 text-balance text-toned')
								li(v-for='content in item?.content') {{ content }}

		//- template(#footer)
		div(class='flex gap-2 flex-wrap group')
			u-badge(v-for='[key, value] of props' variant='subtle' color='neutral' class='text-muted') {{ key }}: {{  value }}
</template>

<script lang="ts" setup>
type Props = {
	active?: boolean
	title?: string
	description?: string
	painPoints?: [string, string][]
	name?: string
	user?: string
	summary?: string
	quote?: string
	image?: string
	statement?: string | string[]
	goals?: string | string[]
	frustrations?: string | string[]
	props: [string, string | number][]
}

const options = defineProps<Props>()

const { t, tc } = useTranslation()

const ui = {
	title: 'text-inverted',
	card: {
		base: 'bg-accented group-hover:from-(--ui-bg-inverted)/50',
		child: 'bg-elevated/90 text-highlighted'
	},
	badge: {
		base: `w-fit h-fit text-nowrap gap-2 ring-1 ring-inset text-inverted/80 hover:text-inverted ring-default/50 hover:ring-default bg-primary`
	},
	carousel: {
		item: 'w-full max-w-80'
	},
	button: 'text-inverted bg-default/10 ring-default/20 hover:bg-default/20 aspect-square place-content-center rounded-full cursor-pointer'
}

const group = computed(() => {
	const { statement, goals, frustrations } = options
	return [
		// {
		// 	title: t('project.user.statement'),
		// 	icon: 'heroicons:information-circle',
		// 	content: Array.isArray(statement) ? statement : [statement]
		// },
		{
			highlighted: false,
			title: tc('project.goal', 2),
			icon: 'i-heroicons:star',
			content: Array.isArray(goals) ? goals : [goals]
		},
		{
			highlighted: false,
			title: tc('project.frustration', 2),
			icon: 'i-heroicons-outline:exclaimation-triangle',
			content: Array.isArray(frustrations) ? frustrations : [frustrations]
		}
	]
})
</script>
