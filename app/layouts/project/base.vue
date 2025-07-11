<template lang="pug">
div
	u-container(class="min-h-screen py-24 flex flex-col gap-16 relative")
		div(class='flex flex-col gap-12 z-20')
			nuxt-picture(v-if='cover' :src='cover' :alt='title' :img-attrs class="w-full sm:aspect-2/1 md:aspect-3/1 rounded-lg ring bg-elevated h-64 lg:h-80 overflow-clip parallel-animation object-cover")

			div(class='flex flex-col gap-8')
				h1(class='text-balance flex font-display uppercase font-bold text-4xl sm:text-6xl xl:text-8xl text-highlighted') {{ title }}
				p(v-if='description' class="text-lg max-w-prose sm:text-lg text-balance space-y-4" v-html='description')

		client-only
			template(#fallback)
				div(class='flex items-center gap-4')
					u-icon(name='i-svg-spinners:180-ring-with-bg' size='2xl' class='w-12 h-12 animate-spin')
					span(class='animate-pulse') {{ t('state.loading') }}...

			lazy-nuxt-layout(v-for='section in sections' v-bind='section')

	u-lazy(class='bg-elevated w-full min-h-px')
		u-container(class="py-24 pt-4 sm:pt-6 lg:pt-16 relative items-center")
			nuxt-layout(name='project-section-others')
</template>

<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'

type Props = {
	id?: number | string
	title: string
	cover?: string
	description: string
	sections?: {
		name: LayoutKey
		src: string[]
		active?: boolean
		aspectRatio?: `${number}/${number}` | number | 'auto'
	}[]
}

const props = withDefaults(defineProps<Props>(), {
	sections: () => []
})

const { t } = useI18n()

const imgAttrs = {
	class: 'w-full h-full object-cover',
	width: '1200',
	height: '800'
}
</script>

<style lang="scss" scoped>
@keyframes parallel {
	to { object-position: top }
}

@media (prefers-reduced-motion: no-preference) {
	.parallel-animation {
		animation: parallel linear both;
		animation-timeline: view();
		animation-duration: exit;
	}
}
</style>
