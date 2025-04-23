<template lang="pug">
div(class='flex flex-col gap-2 w-full')
	h4(v-if='title' class='text-balance flex gap-2 font-display uppercase font-bold text-4xl md:text-6xl lg:text-6xl xl:text-8xl') {{ title }}
	p(v-if='description' style='--characters: 120' class='max-w-prose text-base sm:text-lg text-balance')
		span(class="text-animation") {{ description }}
</template>

<script lang="ts" setup>
type Props = {
	title?: string
	description?: string
}

withDefaults(defineProps<Props>(), {
})

</script>

<style lang="scss" scoped>
@keyframes text { 
	from { background-size: 0 } 
	to { background-size: 100% }
}

@media (prefers-reduced-motion: no-preference) {
  .text-animation {
	background: linear-gradient(90deg, var(--ui-text) 0 0) 0 / calc(var(--characters) * 1ch) var(--ui-text-dimmed);
	background-repeat: no-repeat;

	-webkit-background-clip: text;
	-moz-background-clip: text;
	background-clip: text;

	color: transparent;
    animation: text .1s steps(var(--characters, 100)) both;
    animation-timeline: view();
	animation-range: 10% 40%;
  }
}
</style>
