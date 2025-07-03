<template lang="pug">
div(class='relative min-h-16 overflow-clip bg-default py-24')
  div(v-bind='options' class='motion-safe:sticky motion-safe:top-1/3 flex items-start')
    section-title(:class='ui.title' class='origin-top-left motion-safe:animate-from-[cover,20%] motion-safe:animate-to-[40%,50%] motion-safe:animate-timeline-view motion-safe:animate-fill-both motion-safe:animate-name-[zoom-out,fade-out]' data-cursor="true" hyphens) {{  t('section.skills') }}

  u-container(v-bind='options' as='ul' class='grid grid-rows-1 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-16 pt-8 sm:pt-12 md:pt-20 lg:pt-24 xl:pt-32 z-20 lg:m-auto')
    li(v-for='item, index in data' class='lg:col-start-(--place) lg:row-start-(--place) motion-safe:animate-timeline-view animate-ease animate-fill-both animate-from-20 animate-to-60 motion-safe:animate-name-[fade-in]' :style='{ "--place": index + 1 }')
      div(class='flex flex-col gap-4 align-start motion-safe:animate-timeline-view animate-ease animate-fill-both animate-range-exit animate-direction-reverse motion-safe:animate-name-[fade-in]')
        h4(class="font-bold uppercase font-display text-4xl sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl text-highlighted hyphens-auto break-words sm:break-normal") {{ item.title }}

        div(class='group flex flex-wrap gap-2 max-w-[48ch]')
          p(class='text-base text-balance text-default') {{ parse(item?.content) }}
</template>

<script lang="ts" setup>
type Props = {
	scaleDown?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${base}` : base
	}
})

const { data } = useSkills()

const parse = (array: string[] = []) => {
	return array.length
		? `${array.slice(0, -1).join(', ')} ${t('and')} ${array?.at(-1)}.`
		: `${array.join(', ')}.`
}

const ui = {
	title: 'text-default motion-safe:opacity-10 px-4 sm:px-6 lg:px-8 max-w-7xl'
}
</script>
