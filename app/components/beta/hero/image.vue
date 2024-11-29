<template lang="pug">
div(class='relative overflow-visible w-full lg:max-w-lg lg:h-full lg:max-h-svh')

	//- u-lazy(:transition='{ name: "transition-grow-y" }' :dealy='100' class='w-full h-full pointer-events-none')
	div(key='bg-hero' class='w-full h-full min-h-48 sm:min-h-64 lg:min-h-full relative overflow-visible z-20')

		nuxt-img(src='/hero/human-shadow.png' class='absolute bottom-0 right-0 grow object-cover max-w-full h-80 sm:h-96 z-10 blend-multiply opacity-70' loading='eager' key="image:shadow" alt='' cover)
		nuxt-img(:alt="t('itsme')" src='/hero/human.png' class='absolute bottom-0 right-0 grow object-cover max-w-full h-80 sm:h-96 z-10' key="image" ref='image' loading='eager' cover)

	//- tooltip
	span(class='text-xs normal-case truncate font-sans font-normal h-6 px-2 py-1 rounded bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 text-balance fixed z-40 pointer-events-none shadow group max-w-xs move-position' ref='tooltip') {{ t('itsme') }}
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
</script>

<style lang="scss" scoped>
.transform-3d {
    transform-style: preserve-3d;
    perspective: 550px;
}

.move-position {
  top: var(--move-y);
  left: var(--move-x);
  display: var(--display);
  opacity: var(--opacity, 0);
  transition: .5s ease-in-out;
  transition-property: opacity;
}
</style>
