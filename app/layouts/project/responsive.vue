<template lang="pug">
section(class="flex flex-col gap-16")
	nuxt-layout(v-if='title || description' name='project-section-paragraph' :title :description small-title)

	div(class='flex items-stretch w-full content-between relative rounded-lg gap-4 bg-elevated')
		nuxt-picture(:src='background' :img-attrs="{ class: 'size-full object-cover', width: '1200', height:'' }" alt='' class='rounded-lg grow h-full w-full object-cover object-top ring bg-accented scroll-up-animation opacity-20 aspect-16/9 overflow-clip')
		div(class='absolute top-1/2 -translate-1/2 left-1/2 flex gap-4 slide-up-animation')
			nuxt-picture(v-for='image in images' v-bind='image' :img-attrs="{ class: 'size-full object-cover', width:'', height: '800' }" class='rounded-lg grow mt-(--top) h-50 sm:h-72 md:h-96 lg:h-100 object-cover overflow-clip ring shadow-smooth max-w-3xs slide-animation')
	</template>

<script lang="ts" setup>
type Props = {
	detail?: boolean
	background?: string
	src?: string[]
	aspectRatio?: `${number}/${number}` | number | 'auto'
	title?: string
	description?: string
}

const props = withDefaults(defineProps<Props>(), {
	aspectRatio: () => '1/2',
	src: () => []
})

const images = computed(() => {
	return props.src?.map((src = '', index = 0) => {
		return {
			id: `${index}`,
			class: [
				'bg-elevated aspect-(--aspect) light:opacity-(--opacity) dark:brightness-(--opacity)'
			],
			style: {
				'--aspect': `${props.aspectRatio}`,
				'--opacity': `100%`,
				'--top': `${index * 10}%`,
				'--z-index': `${-index}`
			},
			alt: '',
			src
		}
	})
})
</script>

<style lang="scss" scoped>
@keyframes scroll-up {
    from {
		object-position: center 10%;
		opacity: 0;
    }
}

@keyframes slide-up {
    from {
		transform: translateY(20%) scale(1.2);
		box-shadow: 0 0 transparent;
    }
}

@keyframes slide {
    from { margin-top: 0 }
}

@media (prefers-reduced-motion: no-preference) {
	.scroll-up-animation {
		will-change: object-position, opacity;
		animation: scroll-up ease-in both;
		animation-timeline: view();
		animation-range: entry;
	}
	.slide-up-animation {
		will-change: transform, box-shadow;
		animation: slide-up ease-in both;
		animation-timeline: view();
		animation-range: 0% 50%;
	}

	.slide-animation {
		will-change: margin-top;
		animation: slide ease-in both;
		animation-timeline: view();
		animation-range: entry;
	}
}
</style>
