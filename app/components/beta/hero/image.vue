<template lang="pug">
div(class='relative overflow-visible w-full lg:max-w-lg lg:h-full lg:max-h-screen')
	div(key='bg-hero' class='w-full h-full min-h-48 sm:min-h-64 lg:min-h-full relative overflow-visible z-20 text-base')

		nuxt-picture(:alt="t('itsme')" :img-attrs src='/hero/human.webp' class='absolute overflow-clip bottom-0 right-0 grow object-cover max-w-full h-80 sm:h-96 z-10 content-end ' key="image" ref='image')

	//- tooltip
	span(ref='tooltip' class='text-xs normal-case truncate font-sans font-normal h-6 px-2 py-1 rounded-(--ui-radius) bg-elevated ring-1 ring-(--ui-border) text-balance fixed z-40 pointer-events-none shadow max-w-xs top-(--move-y) left-(--move-x) opacity-(--opacity) ease duration-100 transition-opacity' :style) {{ t('itsme') }}
</template>

<script lang="ts" setup>
const { t } = useI18n()
const reduceMotion = usePreferredReducedMotion()
const target = useTemplateRef<HTMLImageElement>('image')
const tooltip = useTemplateRef('tooltip')

const state = {
	active: false
}

const on = {
	mousemove: (event: MouseEvent) => {
		if (reduceMotion.value === 'reduce') return

		const element = tooltip.value
		const { y = 0, x = 0 } = event

		const offset = 20
		if (element) {
			element.style.setProperty('--move-x', `${x + offset}px`)
			element.style.setProperty('--move-y', `${y + offset}px`)
			element.style.setProperty('--display', 'block')
			element.style.setProperty('--opacity', '1')
		}

		if (!state.active) useEventListener(target, 'mouseleave', on.leave, { once: true })
		state.active = true
	},
	leave: () => {
		const element = tooltip.value

		if (element) {
			element.style.setProperty('--display', 'none')
			element.style.setProperty('--opacity', '0')
		}

		state.active = false
	}
}

useEventListener(target, 'mousemove', on.mousemove)

const style = {
	'--opacity': 0,
	'--display': 'none'
}

const imgAttrs = {
	class: 'w-full h-full object-cover drop-shadow-2xl drop-shadow-primary-950'
}
</script>

<style lang="scss" scoped>
.transform-3d {
    transform-style: preserve-3d;
    perspective: 550px;
}
</style>
