<template lang="pug">
section(class="flex flex-col gap-16")
	nuxt-layout(v-if='title || description' name='project-section-paragraph' :title :description :content :columns small-title)

		div(v-if='images.length' class='grid grid-cols-2 sm:grid-cols-4 gap-4')
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
	const { fit } = props

	return props.src?.map((src = '', index = 0) => {
		return {
			id: `${index}`,
			class: {
				'rounded-lg grow ring overflow-clip object-cover bg-elevated': true,
				'last:col-span-2 sm:last:col-span-1': props.src.length % 2
			},
			style: {
				'--top': `${index * 10}%`,
				'--z-index': `${-index}`,
				'--fit': fit
			},
			imgAttrs: {
				class: {
					'size-full object-cover': true
				},
				style: {
					overflow: 'hidden',
					filter: 'drop-shadow(0 100dvh 0 var(--ui-text))',
					transform: 'translateY(-100dvh)'
				},
				width: '',
				height: '800'
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
