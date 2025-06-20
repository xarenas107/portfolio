<template lang="pug">
div(class='relative overflow-clip bg-default py-24')
  div(v-bind='options' class='fade-exit-animation motion-safe:sticky motion-safe:top-1/3')
    section-title(:class='ui.title' class='origin-left scale-down-animation' hyphens) {{  t('section.skills') }}

  u-container(v-bind='options' as='ul' class='grid grid-rows-1 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-16 pt-8 sm:pt-12 md:pt-20 lg:pt-24 xl:pt-32 z-20 lg:m-auto')
    li(v-for='item, index in data' :class='`scroll-fade-animation lg:col-start-(--place) lg:row-start-(--place)`' :style='{ "--place": index + 1 }')
      div(class='flex flex-col gap-4 align-start')
        h4(class="font-bold uppercase font-display text-4xl sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl text-highlighted hyphens-auto break-words sm:break-normal") {{  item.title  }}

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
	title: 'text-default motion-safe:opacity-10 px-4 sm:px-6 lg:px-8 m-auto max-w-7xl'
}
</script>

<style lang="scss" scoped>
@keyframes scale-down {
  from {
    color: var(--ui-text-toned);
    transform: rotate3d(1,0,0, -5deg) translateX(-2.5ch) scale(4) perspective(550px);
  }
  0%, 40% {
    opacity: 100%;
  }
  50% {
    transform: scale(1);
  }
  50%, 80% {
    opacity: 10%;
  }

  to {
    opacity: 0;
  }
}

@keyframes fade {
  from {
    transform: translateY(20%);
    opacity: 0
  }
  40%, 70% {
    transform: translateY(0%);
    opacity: 100%
  }
  to {
    transform: translateY(-20%);
    opacity: 0
  }
}

@keyframes fade-out {
  to {
    opacity: 0
  }
}

@media (prefers-reduced-motion: no-preference) {
  .scale-down-animation {
    transform-origin: left top;
    transform-style: preserve-3d;
    animation: scale-down ease-out both;
    animation-timeline: view();
    animation-range: 0% 60%;
  }
  .scroll-fade-animation {
    animation: fade ease both;
    animation-timeline: view();
    animation-range: 20% 80%;
  }
  .fade-exit-animation {
    animation: fade-out ease forwards;
    animation-timeline: view();
    animation-range: exit;
  }
}
</style>
