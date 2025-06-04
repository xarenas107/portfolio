<template lang="pug">
section(class='flex flex-col gap-8')
	h4(class='text-2xl font-semibold flex items-center font-display text-muted') {{ t('other', 2)}}

	u-card-group(:ui='ui.card')
		template(#default='{ childClass, containerClass }')
			u-carousel(v-if='data?.length' @select='control.select' v-slot="{ item }" :items :ui="ui.carousel" ref="carousel" align='start' class='w-full' loop arrows)
				nuxt-link(@click.native='open(item?.id)' :class='[containerClass]' class="h-auto max-w-full rounded-lg cursor-pointer relative group/item flex flex-wrap gap-2 aspect-square")
					nuxt-img(:src='item?.cover' :alt='item?.title' :class='[childClass]' class='object-cover rounded-lg pointer-events-none' format='webp' width='160' height='160' loading='lazy')

					//- div(class='absolute z-20 top-0 left-0 w-[100%] h-[100%] p-4 bg-(--ui-bg-accented)/70 place-content-end-safe opacity-0 group-hover/item:opacity-100 rounded-lg border backdrop-blur-xs transition-all duration-400 ease-out pointer-events-none group-hover/item:view-transition-name-[overlay]')
						div(class='flex flex-col gap-2 opacity-0 translate-y-24 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-transform duration-400 ease-out h-full w-full place-center justify-center p-1')
							h6(class='text-default line-clamp-3 text-xs text-semibold') {{ item.title }}
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
</script>

<style lang="scss" scoped>
</style>
