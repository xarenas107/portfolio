<template lang='pug'>
div(class='bg-slate-100 dark:bg-slate-900 w-full py-24 min-h-dvh flex flex-col gap-10 relative overflow-clip')

  div(class='flex px-4 sm:px-6 lg:px-8 gap-8 max-w-7xl m-auto scroll-slide-animation')
    //- section-title(:class='ui.title' class='scroll-fade-animation') {{  data?.title }}
    section-title(v-for='index in 6' class='text-stroke text-primary-500' :class='{ "text-stroke-1 text-transparent": index % 2 }') {{ data?.title }}

  u-container(:ui='ui.container')
    //- div(class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full min-h-[80dvh] z-20")
      div(v-for='group in groups' class="flex flex-col gap-4")
        nuxt-link(v-for='{ grow, order, id, image } in group' @click.native='open(id)' class="h-auto max-w-full rounded-lg cursor-pointer" :style='`flex-grow: ${grow}; order: ${order}`')
          nuxt-img(v-if='image' :src='image' :class="{ 'placeholder-active': active === id }" class="rounded-lg object-cover h-full" )
          u-placeholder(v-else :ui='ui.placeholder' :class="{ 'placeholder-active': active === id }" class="h-full w-full rounded-lg")

    u-card-group(class='z-20 mr-4' :ui='ui.card')
      template(#default='{ containerClass, childClass }')
        div(class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full min-h-dvh z-20")
          div(v-for='group in groups' class="flex flex-col gap-4")
            //- div(v-for='{ grow, order, id, image } in group' )
            nuxt-link(v-for='{ grow, order, id, image } in group' @click.native='open(id)' :class='containerClass' class="h-auto max-w-full rounded-lg cursor-pointer" :style='`flex-grow: ${grow}; order: ${order}`')
              //- div(:class='childClass' class='flex f-full flex-col justify-between cursor-pointer' as='li')
              u-image-bg(v-if='image' :src='image' :class="[{ 'placeholder-active': active === id }, childClass]" class="rounded-lg h-full bg-cover hover:bg-100%" )
              u-placeholder(v-else :ui='ui.placeholder' :class="[{ 'placeholder-active': active === id }, childClass]" class="rounded-lg")
</template>

<script lang='ts' setup>
type Content = {
	title: string
	items: {
		id?: number
		title: string
		subtitle: string
		badge?: string
		paragraphs: {
			image?: string
			text: string
		}[]
		createdAt: string
		group: number
		order: number
		grow: number
	}[]
}

const items = [{
	image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/3cac49141461249.66731ef195704.jpg'
}, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const size = computed(() => Math.round(items.length / 4))
const grows = [8, 12, 10, 12, 6]
const groups = computed(() => {
	const list = [...items].map((item, index) => {
		const place = index + 1
		const group = place <= size.value ? 1 : place <= (size.value * 2) ? 2 : place <= (size.value * 3) ? 3 : 4
		const grow = grows.at(index % 5) || 4
		const order = place
		return { group, grow, order, id: index, image: item?.image ?? '' }
	})

	const map = new Map<number, Content['items']>()

	list.forEach((item, index) => {
		const collection = map.get(item.group)
		if (!collection) map.set(item.group, [item])
		else collection.push(item)
	})

	return Array.from(map.values())
})

const active = useState<string | number | undefined>('project:active')

const { data, status } = useFetchContent<Content>('section/projects', {
	default: () => ({
		title: '',
		items: []
	})
})

const ui = {
	title: 'text-primary-600 dark:text-primary-500 text-stroke',
	container: {
		base: 'h-full w-full'
	},
	placeholder: {
		svg: {
			// base: 'bg-primary-400 stroke-primary-600 dark:bg-primary-100 dark:stroke-primary-400',
			base: 'stroke-primary-600 dark:stroke-primary-400'
		}
	},
	card: {
		base: 'bg-primary-400 dark:bg-primary-600',
		child: `bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300`,
		before: `before:bg-primary-800 dark:before:bg-primary-100`,
		after: `after:bg-primary-600 dark:after:bg-primary-300`
	}
}

const open = async (id: number) => {
	active.value = id
	await navigateTo(`/project/${id}`)
}

onMounted(() => {
	active.value = undefined
})
</script>

<style lang='scss' scoped>
@keyframes slide-from-end {
  from {
    // font-size: 60dvh;
    transform: translateX(-100%);
  }
  to {
    transform: translateX(-50%);
  }
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
