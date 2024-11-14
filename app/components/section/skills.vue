<template lang="pug">
div(class='min-h-[60dvh] relative overflow-clip bg-slate-100 dark:bg-slate-900 py-24')
  div(class='fade-exit-animation motion-safe:sticky motion-safe:top-[30dvh]')
    section-title(:class='ui.title' class='origin-left scale-down-animation' hyphens) {{  data?.title }}

  u-container(:ui='ui.container' as='ul')
    li(v-for='item, index in data?.items' :class='`scroll-fade-animation lg:grid-start-${index + 1}`')
      div(class='flex flex-col gap-4 align-start')
        h2(class="font-extrabold text-4xl sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl text-primary-600 dark:text-primary-500 hyphens-auto break-words sm:break-normal") {{  item.title  }}

        div(class='group flex flex-wrap gap-2 max-w-[48ch]')
          p(class='text-base text-balance text-slate-700 dark:text-slate-300') {{ item?.content?.join(', ') }}
</template>

<script lang="ts" setup>
type Content = {
  title: string
  items: {
    title: string
    content: string[]
  }[]
}

const theme = useTheme()
const { data, status } = useFetchContent<Content>('section/skills', {
  default: () => ({
    title: '',
    items: []
  })
})

const ui = {
  title: 'text-primary-600 dark:text-primary-500 motion-safe:opacity-10 px-4 sm:px-6 lg:px-8 m-auto max-w-7xl',
  container: {
    base: 'grid grid-rows-1 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-16 pt-8 sm:pt-12 md:pt-20 lg:pt-24 xl:pt-32 z-20 lg:m-auto',
  },
}

</script>

<style lang="scss" scoped>
@keyframes scale-down {
  from {
    // font-size: 60dvw;
    color: rgb(var(--color-primary-600));
    transform: translate(-30dvw) scale(3);
    opacity: 100%;
  }

  80% {
    transform: translate(0dvw) scale(1);
    opacity: 100%;
  }
}

@keyframes fade {
  from { 
    transform: translateY(20dvh);
    opacity: 0 
  }
  40%, 70% {  
    transform: translateY(0dvw);
    opacity: 100% 
  }
  to { 
    transform: translateY(-20h);
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
    animation: scale-down ease-out both;
    animation-timeline: view();
    animation-range: 0 60dvh;
  }
  .scroll-fade-animation {
    animation: fade ease both;
    animation-timeline: view();
    animation-range: 20dvh 100dvh;
  }
  .scroll-rainbow-animation {
    animation: rainbow ease-in both;
    animation-timeline: view();
    animation-range: 100dvh 110dvh;
  }
  .fade-exit-animation {
    animation: fade-out ease forwards;
    animation-timeline: view();
    animation-range: exit-crossing;
  }
}

@media (min-width: 1024px) {
  @for $i from 1 through 3 {
    .lg\:grid-start-#{$i} {
      grid-column-start: #{$i};
      grid-row-start: #{$i};
    }
  } 
}
</style>
