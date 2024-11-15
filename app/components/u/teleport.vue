<template lang="pug">
client-only
    teleport(v-if='target && active' :to='`[data-teleport="${ to }"]`' :disabled="!target || disabled")
        slot
</template>

<script setup lang="ts">
type Props = {
	to?: string
	disabled?: boolean
}

const props = defineProps<Props>()

const target = computed(() => !!document.querySelector(`[data-teleport="${props.to}"]`))

const active = shallowRef(false)
const enable = [onMounted, onActivated]
enable.forEach(callback => callback(() => active.value = true))

const disable = [onBeforeUnmount, onDeactivated]
disable.forEach(callback => callback(() => active.value = false))
</script>

<style lang="scss" scoped></style>
