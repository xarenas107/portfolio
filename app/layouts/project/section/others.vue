<template lang="pug">
section(class='flex flex-col gap-8')
	h4(class='text-2xl font-semibold flex items-center font-display text-muted') {{ t('other', 2)}}

	u-card-group(:ui='ui.card')
		template(#default='{ childClass, containerClass }')
			u-carousel(v-if='data?.length' @select='control.select' v-slot="{ item }" :items :ui="ui.carousel" ref="carousel" align='start' class='w-full' loop arrows)
				nuxt-link(@click.native='open(item?.id)' :class='[containerClass]' class="h-auto max-w-full rounded-lg cursor-pointer relative group/item flex flex-wrap gap-2 aspect-square")
					nuxt-picture(:src='item?.cover' :alt='item?.title' :class='[childClass]' :img-attrs class='object-cover rounded-lg overflow-clip pointer-events-none' loading='lazy')

					h6(class='text-muted text-xs max-w-prose hidden  pointer-coarse:line-clamp-3') {{ item?.title }}
</template>

<script lang="ts" setup>
type Props = {
	scaleDown?: boolean
}

defineProps<Props>()
const { t } = useI18n()
const { data } = useProjects()
const route = useRoute()

const carousel = useTemplateRef('carousel')
const index = shallowRef(0)

const control = {
	select: (value: number) => { index.value = value },
	to: (value: number) => {
		control.select(value)
		carousel.value?.emblaApi?.scrollTo(value)
	},
	next: () => { control.to(index.value + 1) },
	prev: () => { control.to(index.value - 1) }
}

const open = async (id?: string) => {
	if (!id) return
	await navigateTo({ name: 'project-id', params: { id } })
}

const items = computed(() => {
	const { id } = { ...route.params }
	return data.value.filter(item => item.id !== id)
})

const ui = {
	title: 'text-inverted',
	card: {
		base: 'group-hover:bg-default/20 group-hover:from-(--ui-bg-inverted) p-px',
		child: 'bg-default/80 text-inverted'
	},
	badge: {
		base: `w-fit h-fit text-nowrap gap-2 ring-1 ring-inset text-inverted/80 hover:text-inverted ring-default/50 hover:ring-default bg-primary`
	},
	carousel: {
		root: 'w-full',
		item: 'w-full max-w-32'
	},
	button: 'cursor-pointer rounded-full'
}

const imgAttrs = {
	class: 'w-full h-full object-cover',
	width: '160',
	height: '160'
}
</script>

<style lang="scss" scoped>
</style>
