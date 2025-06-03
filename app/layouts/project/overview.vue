persona<template lang="pug">
section(v-if='active' class="flex flex-col gap-8")
	nuxt-layout(name='project-section-paragraph' :title :description :small-title)

	u-card-group(:ui='ui.card' v-if='items?.length')
		template(#default='{ childClass, containerClass }')
			div(class='grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap')
				div( v-for='{ title, description, icon } of items' :class='[containerClass]' class='scroll-up-animation')
					nuxt-layout(name='project-section-card' :content='description' :title :icon :class='childClass' variant='solid')
</template>

<script lang="ts" setup>
type Props = {
	active?: boolean
	title?: string
	description?: string
	smallTitle?: boolean
	items?: {
		title?: string
		description?: string
		icon?: string
	}[]
}

const props = defineProps<Props>()

const { t } = useI18n()

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
</script>

<style lang="scss" scoped>
@keyframes scroll-up {
    from { opacity: 0 }
}
@media (prefers-reduced-motion: no-preference) {
	.scroll-up-animation {
		animation: scroll-up ease-in forwards;
		animation-timeline: view();
		animation-range: entry;
	}
}
</style>
