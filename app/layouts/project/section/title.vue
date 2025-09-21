<template lang="pug">
h2( :class='[{ "hyphens-auto": hyphens }, classes]' lang='es') {{ title }}
	//- u-icon(v-if='icon' :name='icon' )
</template>

<script lang="ts" setup>
type Props = {
	title?: string
	hyphens?: boolean
	icon?: string
}

withDefaults(defineProps<Props>(), {
	icon: () => ''
})

const classes = 'text-balance flex gap-2 font-display uppercase font-semibold text-4xl lg:text-6xl'
</script>
