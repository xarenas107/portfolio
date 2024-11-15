<template lang='pug'>
div(class='max-h-dvh overflow-auto')
    slot(class='scroll-reveal-animation sticky top-0')
</template>

<script setup lang="ts">
type Props = {
}
</script>

<style lang='scss' scoped>
@keyframes reveal {
  to {
    transform: scale(2);
    height: 0px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-reveal-animation {
    animation: reveal ease-in-out forwards;
    animation-timeline: view();
    animation-range: exit;
  }
}
</style>
