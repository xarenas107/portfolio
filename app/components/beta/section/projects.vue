<template lang='pug'>
div(class='bg-primary-500 dark:bg-primary-600 w-full py-24 min-h-svh flex flex-col gap-10 relative overflow-clip')

	div(class='flex px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl m-auto scroll-slide-animation')
		section-title(v-for='index in 6' class='text-stroke' :class='index % 2 ? "text-stroke-2 text-primary-400 dark:text-primary-500" : ui.title') {{ data?.title }}

	u-container(:ui='ui.container')
		u-card-group(class='z-20 mr-4' :ui='ui.card')
			template(#default='{ containerClass, childClass }')
				div(class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full min-h-svh z-20")
					div(v-for='group in groups' class="flex flex-col gap-4")
						//- div(v-for='{ grow, order, id, image } in group' )
						nuxt-link(v-for='{ grow, order, id, image } in group' @click.native='open(id)' :class='containerClass' class="h-auto max-w-full rounded-lg cursor-pointer" :style='`flex-grow: ${grow}; order: ${order}`')
							//- div(:class='childClass' class='flex f-full flex-col justify-between cursor-pointer' as='li')
							u-image-bg(v-if='image' :src='image' :class="[{ 'placeholder-active': active?.id === id }, childClass]" class="rounded-lg h-full bg-cover hover:bg-100%" )
							u-placeholder(v-else :ui='ui.placeholder' :class="[{ 'placeholder-active': active?.id === id }, childClass]" class="rounded-lg")
</template>

<script lang='ts' setup>
type Project = {
	id: number
	title: string
	subtitle: string
	image?: string
}

type Content = {
	title: string
	items: Project[]
}

type Item = Project & {
	group: number
	order: number
	grow: number
}

type Props = {
	// id?: string
}

defineProps<Props>()

const size = computed(() => Math.round((data.value?.items.length ?? 0) / 4))
const grows = [8, 12, 10, 12, 6]
const groups = computed(() => {
	const items = data.value?.items ?? []
	const list = [...items].map((item, index) => {
		const place = index + 1
		const group = place <= size.value ? 1 : place <= (size.value * 2) ? 2 : place <= (size.value * 3) ? 3 : 4
		const grow = grows.at(index % 5) || 4
		const order = place
		return { ...item, group, grow, order }
	})

	const map = new Map<number, Item[]>()

	list.forEach((item, index) => {
		const collection = map.get(item.group)
		if (!collection) map.set(item.group, [item])
		else collection.push(item)
	})

	return Array.from(map.values())
})

const key = 'project:active'
const active = useState<Partial<Project> | undefined>(key)

const { data, status } = useFetchContent<Content>('section/projects', {
	default: () => ({
		title: '',
		items: []
	})
})

const ui = {
	title: 'text-primary-100 dark:text-primary-100',
	container: {
		base: 'h-full w-full'
	},
	placeholder: {
		svg: {
			// base: 'bg-primary-400 stroke-primary-600 dark:bg-primary-100 dark:stroke-primary-400',
			base: 'stroke-primary-600 dark:stroke-primary-400 bg-primary-400 dark:bg-primary-600'
		}
	},
	card: {
		base: 'bg-primary-400 dark:bg-primary-600',
		child: `bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300`,
		before: `before:bg-primary-800 dark:before:bg-primary-100`,
		after: `after:bg-primary-600 dark:after:bg-primary-300`
	}
}

const open = async (id: number) => {
	active.value = data.value?.items.find(item => item.id === id)
	await navigateTo(`/project?id=${id}`)
}

onMounted(() => {
	clearNuxtState(key)
})
</script>

<style lang='scss' scoped>
@keyframes slide-from-end {
	from { transform: translateX(-100%) }

	to { transform: translateX(-50%) }
}

@media (prefers-reduced-motion: no-preference) {
	.scroll-slide-animation {
		animation: slide-from-end linear forwards;
		animation-timeline: view();
	}
}

.placeholder-active {
	view-transition-name: selected-project;
	contain: layout;
}
</style>
