<template lang="pug">
section(class="flex flex-col" :class='ui.container')
	div(class='flex flex-col gap-8 w-full')
		article(v-if='description || title' :class='{ "max-w-prose": !columns }' class='text-base sm:text-lg text-balance gap-4 flex flex-col')
			h4(v-if='title' v-bind='ui.title') {{ title }}
			//- p(:style='{ "--characters": description?.length }' class="motion-safe:animate-timeline-view motion-safe:animate-from-10 motion-safe:animate-to-40  motion-safe:animate-fill-both motion-safe:animate-duration-100 motion-safe:animate-name-[text] space-y-4 inline" v-html='description')
			p(v-if='description' :style v-bind="ui.content" v-html='description')
			p(v-if='content' :style v-bind="ui.content" v-html='content' class='md:columns-(--columns) gap-12')

		nuxt-img(v-if='src' :src v-bind='ui.image')

		slot()
</template>

<script lang="ts" setup>
type Props = {
	title?: string
	description?: string
	content?: string
	smallTitle?: boolean
	aspectRatio?: string
	src?: string
	sticky?: boolean
	columns?: number
	fit?: 'contain' | 'cover' | 'fill'
	forceContrast?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	aspectRatio: '16/9',
	fit: 'contain'
})

const style = computed(() => {
	return {
		'--characters': props.description?.length,
		'--columns': props.columns
	}
})

const ui = computed(() => {
	const { smallTitle, sticky, aspectRatio, fit } = props
	return {
		container: {
			relative: sticky
		},
		title: {
			class: {
				'font-semibold text-2xl md:text-4xl': smallTitle,
				'font-bold text-4xl md:text-6xl': !smallTitle,
				'sticky top-16 bg-default border-b border-default pb-2 pt-4 z-10': sticky,
				'text-balance flex gap-2 font-display uppercase': true
			}
		},
		content: {
			class: {
				'text-lg text-default space-y-4': true
			}
		},
		image: {
			class: {
				'aspect-(--aspect) object-fit-(--fit) max-h-2/3 grow bg-elevated rounded-lg': true
			},
			width: '1200',
			height: '',
			style:	{
				'--aspect': aspectRatio,
				'--fit': fit
			}
		}
	}
})
</script>

<style lang="scss" scoped>
@keyframes scroll-up {
    from {
		object-position: center -10dvh;
		opacity: 0;
    }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-up-animation {
    animation: scroll-up ease-in forwards;
    animation-timeline: view();
    animation-range: entry;
  }
}
</style>
