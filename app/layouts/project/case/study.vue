<template lang="pug">
u-container(class="min-h-screen py-24 flex flex-col gap-16 lg:gap-24 relative")
	div(class='flex flex-col gap-6')
		u-card(class='aspect-[10/4] w-full relative overflow-clip flex items-end')
			section-title(class='z-20 relative text-neutral-100 dark:text-neutral-950 -ml-6 -mb-9 sm:-ml-8 sm:-mb-14 max-w-prose') {{ title }}
		h4(class="text-base sm:text-lg max-w-sm lg:max-w-lg text-balance") {{ description }}

	//- Project overview
	nuxt-layout(name='project-section' :title="t('project.overview.name')")
		div(class='grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-wrap')
			nuxt-layout(name='project-section-card' v-for='item of overview' v-bind='item')

	//- User research
	nuxt-layout(name='project-section' :title="t('project.user.name')")
		article(class='flex flex-col gap-2 lg:gap-4 max-w-prose')
			h4(class='text-2xl lg:text-4xl font-semibold flex items-center') {{ t('project.summary') }}
			p(class='text-base max-w-prose') {{ user?.summary }}

		article(class='flex gap-6 flex-col')
			h4(class='text-2xl lg:text-4xl font-semibold flex items-center') {{ tc('project.painPoint', 2) }}

			div(class='grid lg:grid-cols-2 gap-4 grow')
				u-card(v-for='[title, content] in user?.painPoints' name='project-section-card' class='ring-1 bg-neutral-200')
					div(class='flex flex-col gap-2 max-w-prose')
						h4(class='text-xl lg:text-2xl font-semibold flex items-center') {{  title }}
						p(class='text-base opacity-80 text-balance') {{ content }}

		//- User persona
		article(class='flex flex-col gap-10')
			div(class='flex flex-col gap-4')
				h4(class='text-2xl lg:text-4xl font-semibold flex items-center') {{ t('project.user.persona.name') }}
				u-card(class='ring-1  bg-neutral-200')
					template(#header)
						nuxt-layout(name='project-persona' :item='user?.persona' class='sm:col-span-2 lg:col-span-3 ')

					div(class='grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 gap-4')
						nuxt-layout(name='project-section-card' :title="t('project.user.statement')" :content='user?.persona?.statement' class='sm:col-span-2 lg:col-auto bg-neutral-300 dark:bg-neutral-800')
						nuxt-layout(name='project-section-card' :title="t('project.goal', { count: 2 })" class='bg-neutral-300 dark:bg-neutral-800')
							ul(class='list-disc text-base opacity-80 list-inside flex flex-col gap-2 text-balance')
								li(v-for='item in user?.persona?.goals') {{ item }}

						nuxt-layout(name='project-section-card' :title="tc('project.frustration', 2)" class='bg-neutral-300 dark:bg-neutral-800')
							ul(class='list-disc text-base opacity-80 list-inside flex flex-col gap-2 text-balance')
								li(v-for='item in user?.persona?.frustrations') {{ item }}

					template(#footer)
						div(class='flex gap-2 flex-wrap group mt-2 opacity-50')
							u-badge(v-for='[key, value] of user?.persona?.props' :ui='ui.badge' variant='outline') {{ key }}: {{  value }}

		div(class='flex flex-col gap-2 lg:gap-4 max-w-prose')
			h4(class='text-2xl lg:text-4xl font-semibold flex items-center') {{ t('project.user.journey.name') }}
			p(class='text-base max-w-prose') {{ user?.persona?.journey?.description }}

		div(class='overflow-auto snap-x snap-mandatory')
			table(class='text-sm table-auto flex flex-col w-max lg:w-auto max-w-7xl')
				thead(class='border-b py-2 border-neutral-400 dark:border-neutral-600')
					tr(class="gap-2 text-left grid grid-cols-6")
						th(class='snap-start snap-always') {{  t('project.user.journey.action') }}
						th(v-for="item in user?.persona?.journey?.map?.action" class='snap-start') {{ item }}

				tbody(class='opacity-80 font-sans')
					tr(class="gap-2 py-2 border-b border-neutral-400 dark:border-neutral-600 grid grid-cols-6")
						td {{  t('project.user.journey.task') }}
						td(v-for="tasks in user?.persona?.journey?.map?.task" class='list-decimal list-inside gap-1 text-balance')
							ul(class='list-decimal list-inside')
								li(class='list-item' v-for='task in tasks') {{ task }}

					tr(class="gap-2 py-2 border-b border-neutral-400 dark:border-neutral-600 grid grid-cols-6")
						td {{  tc('project.user.journey.emotion', 2) }}
						td(v-for="emotions in user?.persona?.journey?.map?.emotion" class='gap-1 text-balance')
							p(v-for='emotion in emotions') {{ emotion }}

					tr(class="py-2 gap-2 grid grid-cols-6")
						td {{  tc('project.user.journey.opportunities', 2) }}
						td(v-for="opportunities in user?.persona?.journey?.map?.opportunity" class='gap-1 text-balance')
							p(v-for='opportunity in opportunities') {{ opportunity }}

	//- Design
	nuxt-layout(name='project-section' :title="t('project.design.name')")
		div(class='flex flex-col gap-2 lg:gap-4 w-full')
			h4(class='text-2xl lg:text-4xl font-semibold flex items-center') {{ t('project.design.wireframe') }}

			div(class='group flex gap-8 min-w-full')
				article(v-for='item in design?.wireframe?.items' class='flex flex-col gap-8 w-full max-w-md')
					p(class='opacity-80 w-full text-base max-w-md overflow-ellips line-clamp-3 grow') {{ item?.content }}

					div(class='flex flex-auto gap-4 shrink grow-0')
						div(v-for='image in item?.images' class='h-auto cursor-default snap-center grow p-0 rounded-lg overflow-clip ring-1 ring-neutral-400 dark:ring-neutral-600')
							nuxt-img(:src='`/project/${id}${image}`' class='pointer-events-none h-full')
</template>

<script lang="ts" setup>
type Props = {
	id?: number | string
	title?: string
	description?: string
	subtitle?: string
	image?: string
	overview?: {
		product?: string
		duration?: string
		problem?: string
		goal?: string
		role?: string
		responsability?: string
	}
	user?: {
		summary?: string
		painPoints?: [string, string][]
		persona?: {
			name?: string
			description?: string
			quote?: string
			image?: string
			statement?: string
			goals?: string
			frustrations?: string
			props: [string, string | number][]
			journey: {
				description?: string
				map: Record<string, string[]>
			}
		}
	}
	design?: {
		wireframe?: {
			items?: {
				content?: string
				images?: string[]
			}[]
		}
	}
}

const props = withDefaults(defineProps<Props>(), {
})

const overview = computed(() => {
	return [
		{
			title: t('project.overview.product'),
			content: props.overview?.product,
			icon: 'i-heroicons:device-tablet-solid',
			class: 'sm:col-span-2 md:col-auto lg:col-span-2'
		},
		{
			title: t('project.overview.duration'),
			content: props.overview?.duration,
			icon: 'i-heroicons:clock'
		},
		{
			title: t('project.overview.problem'),
			content: props.overview?.problem,
			icon: 'i-heroicons:information-circle'
		},
		{
			title: t('project.overview.goal'),
			content: props.overview?.goal,
			icon: 'i-heroicons:star'
		},
		{
			title: t('project.overview.role'),
			content: props.overview?.role,
			icon: 'i-heroicons:user-circle'
		},
		{
			title: t('project.overview.responsability'),
			content: props.overview?.responsability,
			icon: 'i-heroicons:list-bullet',
			class: 'sm:col-span-2 md:col-auto lg:col-span-2'
		}
	]
})

const { t, tc } = useTranslation()

const ui = {
	card: {
		background: 'bg-primary-500 dark:bg-primary-600'
	},
	badge: {
		base: `w-fit h-fit text-nowrap gap-2`,
		color: {
			primary: {
				outline: `ring-1 ring-inset text-current dark:text-current ring-current dark:ring-current`
			}
		}
	}
}
</script>
