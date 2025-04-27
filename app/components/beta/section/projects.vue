<template lang='pug'>
div(class='bg-elevated w-full py-24 min-h-svh flex flex-col gap-16 relative overflow-clip')

	div(class='flex px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl m-auto scroll-slide-animation')
		section-title(v-for='index in 6' :class='index % 2 ? "text-stroke paint-order-stroke text-(--ui-bg-elevated)" : ui.title') {{ data?.title }}

	u-container(:ui='ui.container')
		u-card-group(class='z-20 mr-4 w-full' :ui='ui.card')
			template(#default='{ containerClass, childClass }')
				div(class="grid grid-cols-2 md:grid-cols-4 auto-cols-auto grid-flow-row-dense auto-rows-auto gap-4")

					nuxt-link(v-for='{ id, image, title, description } in items' @click.native='open(id)' :class='containerClass' class="h-auto max-w-full rounded-lg cursor-pointer relative")
						nuxt-img(:src='image' :class="[childClass]" class='object-cover rounded-lg bg-accented')
						
						div(class='absolute z-20 top-0 left-0 w-[100%] h-[100%] p-4 bg-(--ui-bg-accented)/70 backdrop-blur-xs')
							h4(class='text-highlighted') {{ title }}
							p(class='text-default') {{ description }}
</template>

<script lang='ts' setup>
type Project = {
	id: number
	title: string
	description: string
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

// const groups = computed(() => {
// 	const items = data.value?.items ?? []
// 	const list = [...items].map((item, index) => {
// 		const place = index + 1
// 		const group = place <= size.value ? 1 : place <= (size.value * 2) ? 2 : place <= (size.value * 3) ? 3 : 4
// 		const grow = grows.at(index % 5) || 4
// 		const order = place
// 		return { ...item, group, grow, order }
// 	})

// 	const map = new Map<number, Item[]>()

// 	list.forEach((item, index) => {
// 		const collection = map.get(item.group)
// 		if (!collection) map.set(item.group, [item])
// 		else collection.push(item)
// 	})

// 	return Array.from(map.values())
// })

const key = 'project:active'
const active = useState<Partial<Project> | undefined>(key)

const { data, status } = useFetchContent<Content>('section/projects', {
	default: () => ({
		title: '',
		items: []
	})
})

const items = computed(() => {
	const items = data.value?.items ?? []
	return [...items].map((item, index) => {
		const place = index + 1
		const group = place <= size.value ? 1 : place <= (size.value * 2) ? 2 : place <= (size.value * 3) ? 3 : 4
		const grow = grows.at(index % 5) || 4
		const order = place
		return { ...item, group, grow, order }
	})
})

const row = computed(() => {
	const result = items.value.length / 4 
	const rest = items.value.length & 4 

	const map = new Map< number,string>()
	items.value.forEach( (item, index) => {
		const key = index + 1
		
		if (index === 0) map.set(index, '--row: span 3')
		if (key % 2 === 0) map.set(index, '--row: span 2')
		if (key % 4 === 0) map.set(index, '--row: span 3')
	})

	return map
})

// const rows = computed(() => Math.ceil(items.value.length / 4))
// const rows = computed(() => `repeat(${ Math.ceil(items.value.length / 4) }, minmax(0, 1fr))`)

const ui = {
	title: 'text-(--ui-primary)',
	container: {
		base: 'h-full w-full'
	},
	placeholder: {
		svg: {
			// base: 'bg-primary-400 stroke-primary-600 dark:bg-primary-100 dark:stroke-primary-400',
			base: 'dark:stroke-default bg-accented'
		}
	},
	card: {
		border: 'px',
		base: 'bg-(--ui-border) p-px',
		child: 'text-neutral-950 dark:text-neutral-50',
		before: `before:bg-neutral-900 dark:before:bg-neutral-100`,
		after: `after:bg-neutral-900 dark:after:bg-neutral-100`
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
