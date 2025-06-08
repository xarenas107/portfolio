<template lang="pug">
section(class="flex flex-col gap-16")
	nuxt-layout(v-if='title || description' name='project-section-paragraph' :title :description small-title)

	div(class='flex items-stretch w-full content-between relative rounded-lg gap-4 bg-elevated')
		div(class='rounded-lg grow size-full object-cover object-top bg-accented opacity-20 aspect-16/9 overflow-clip')
			nuxt-picture(v-if='background' :src='background' :img-attrs alt='')
		div(class='absolute top-1/2 -translate-1/2 left-1/2 flex gap-4 slide-up-animation')
			nuxt-picture(v-for='image in images' v-bind='image' class='rounded-lg grow mt-(--top) h-50 sm:h-72 md:h-96 lg:h-100 object-cover overflow-clip ring ring-accented shadow-smooth slide-animation')
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
			imgAttrs: {
				class: 'size-full object-cover',
				width: '',
				height: '800'
			},
			alt: '',
			src
		}
	})
})

const imgAttrs = {
	class: 'size-full object-cover object-top',
	width: '1200',
	height:	''
}
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
		animation-range: 0% 40%;
	}

	.slide-animation {
		will-change: margin-top;
		animation: slide ease-in both;
		animation-timeline: view();
		animation-range: entry;
	}
}
</style>
