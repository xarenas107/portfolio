<template lang="pug">
u-container(class="min-h-svh py-24 flex flex-col gap-16 relative")

	div(class='flex flex-col gap-8 z-20 view-transition-name-[selected-project]')
		nuxt-img(v-if='cover' :src='cover' :alt='title' class="w-full aspect-1 sm:aspect-2/1 md:aspect-3/1 rounded-lg ring object-cover h-full bg-elevated parallel-animation")

		div(class='flex flex-col gap-2')
			h1(class='text-balance flex font-display uppercase font-bold text-4xl sm:text-6xl xl:text-8xl text-highlighted') {{ title }}
			h4(v-if='description' class="text-base max-w-prose sm:text-lg text-balance") {{ description }}

	client-only
		template(#fallback)
			div(class='flex items-center gap-4')
				u-icon(name='i-svg-spinners:180-ring-with-bg' size='2xl' class='w-12 h-12 animate-spin')
				span(class='animate-pulse') {{ t('state.loading') }}...

		u-transition(delay='.1s' before-enter-class="opacity-0" duration='.25s' timing-function="ease-out")
			template(#default='{ state, ...props }')
				nuxt-layout(v-for='section in sections' v-bind='{ ...props, ...section }')
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
		aspectRatio?: `${number}/${number}` | number | 'auto'
	}[]
}

const props = withDefaults(defineProps<Props>(), {
	sections: () => []
})

const { t } = useI18n()
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
