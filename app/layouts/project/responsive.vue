<template lang="pug">
section(class="flex flex-col gap-16")
	nuxt-layout(v-if='title || description' name='project-section-paragraph' :title :description :content :columns small-title)

	div(class='flex w-full relative content-between rounded-lg gap-4 bg-elevated items-center justify-center p-4 lg:p-8 aspect-video')
		div(v-if='background' class='absolute top-0 left-0 rounded-lg grow size-full object-cover object-top opacity-20 overflow-clip')
			nuxt-picture(:src='background' :img-attrs alt='' class='bg-elevated')

		div(v-if='images.length' class='flex gap-4 z-5')
			nuxt-picture(v-for='image in images' v-bind='image')
	</template>

<script lang="ts" setup>
type Props = {
	detail?: boolean
	background?: string
	src?: string[]
	aspectRatio?: `${number}/${number}` | number | 'auto'
	title?: string
	description?: string
	forceContrast?: boolean
	fit?: string
	content?: string
	columns?: number
}

const props = withDefaults(defineProps<Props>(), {
	aspectRatio: () => '1/2',
	src: () => [],
	fit: () => 'cover'
})

const images = computed(() => {
	const { forceContrast, aspectRatio, fit } = props

	return props.src?.map((src = '', index = 0) => {
		return {
			id: `${index}`,
			class: {
				'aspect-(--aspect) light:opacity-(--opacity) dark:brightness-(--opacity) object-contain overflow-clip bg-accented': !forceContrast,
				'bg-inverted': forceContrast,
				'rounded-lg grow mt-(--top) max-w-24 h-2/3 sm:max-w-32 md:max-w-40 lg:max-w-48 lg:max-h-120 ring ring-accented overflow-clip object-cover shadow-smooth': true
			},
			style: {
				'--aspect': `${aspectRatio}`,
				'--opacity': `100%`,
				'--top': `${index * 10}%`,
				'--z-index': `${-index}`,
				'--fit': fit
			},
			imgAttrs: {
				class: {
					'light:invert-100': forceContrast,
					'size-full object-cover': true
				},
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
