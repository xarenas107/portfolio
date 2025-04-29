<template lang="pug">
u-container(class="min-h-svh py-24 flex flex-col gap-16 lg:gap-24 relative ")
	
	div(class='flex flex-col gap-8 z-20')
		nuxt-img(v-if='cover' :src='cover' alt='' class="w-full aspect-1 sm:aspect-2/1 md:aspect-3/1 rounded-lg ring object-cover h-full bg-elevated")
		h1(class='text-balance flex gap-2 font-display uppercase font-bold text-4xl sm:text-6xl xl:text-8xl text-highlighted') {{ title }}
		h4(v-if='description' class="text-base max-w-prose sm:text-lg text-balance") {{ description }}
	
	client-only
		template(#fallback) 
			div(class='flex items-center gap-4')
				u-icon(name='i-svg-spinners:180-ring-with-bg' size='2xl' class='w-12 h-12 animate-spin') 
				span(class='animate-pulse') {{ t('state.loading') }}...


		u-transition(delay='.1s' before-enter-class="opacity-0" duration='.25s' timing-function="ease-out")
			template(#default='{ state, ...props }')
				nuxt-layout(v-for='item in items' v-bind='{ ...props, ...item }')
</template>

<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'

type Props = {
	id?: number | string
	title: string
	cover?: string
	description: string
	items: {
		name: LayoutKey
		src: string[]
		aspectRatio?: `${number}/${number}` | number | 'auto'
	}[]
}

const props = withDefaults(defineProps<Props>(), {
	items: () => [],
})

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.placeholder-active {
	view-transition-name: selected-project;
}

::view-transition-old(selected-project),
::view-transition-new(selected-project) {
	width: auto;
	height: 20px
}
</style>
