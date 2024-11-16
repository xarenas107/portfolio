<template lang='pug'>
div(class='relative infinite-slider flex gap-2')
  //- u-button(@click.stop='on.prev' icon='i-heroicons:chevron-left-solid' class='rounded-full absolute z-40 -left-4 top-[50%] -translate-y-[50%]' size='xl' square)
  slot(@click.stop='on.click' :items :class="[ui.base , 'motion-reduce:hidden']" aria-hidden)
  slot(@click.stop='on.click' :items :class='ui.base')
  slot(@click.stop='on.click' :items :class="[ui.base, 'motion-reduce:hidden']" aria-hidden)
  //- u-button(@click='on.next' icon='i-heroicons:chevron-right-solid' class='rounded-full absolute z-40 -right-4 top-[50%] -translate-y-[50%]' size='xl' square)
</template>

<script lang='ts' generic="T extends unknown"setup>
type Props = {
	stop?: boolean
}

const props = defineProps<Props>()

const ui = {
	base: 'infinite-slider-group scroll-hidden motion-reduce:overflow-x-auto snap-x snap-mandatory'
}

const on = {
	click: (event: MouseEvent) => {
		const element = event?.target as HTMLElement
		element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
	},
	prev: (event: MouseEvent) => {

	},
	next: (event: MouseEvent) => {

	}
}

const items = defineModel<T[]>('items', { default: () => [] })
const state = computed(() => props.stop ? 'paused' : 'running')
const time = computed(() => `${items.value.length * 5}s`)
</script>

<style lang='scss'>
@keyframes scroll {
	from { transform: translateX(-100%) }
	to { transform: translateX(-200%) }
}

@media (prefers-reduced-motion: no-preference) {
  .infinite-slider {
    &:hover>&-group { animation-play-state: paused }

    &>&-group {
      will-change: transform;
      animation: scroll v-bind(time) linear infinite;
      animation-play-state: v-bind(state)
    }
  }
}
</style>
