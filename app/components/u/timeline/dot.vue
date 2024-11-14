<template lang='pug'>
div(:class="`w-${radio} h-${radio} aspect-square rounded-full relative`")
</template>

<script lang='ts' setup>
type Props = {
    radio?: number
}
withDefaults(defineProps<Props>(), {
    radio: 2
})
</script>
