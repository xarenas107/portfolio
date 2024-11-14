<template lang="pug">
svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.83 311.13")
    //- path(class="fill-slate-900 dark:fill-slate-100" d="M157.26,78.49l77.07,77.07-77.07,77.07-77.07-77.07,77.07-77.07M157.26,77.78l-77.78,77.78,77.78,77.78,77.78-77.78-77.78-77.78h0Z")
    
    rect(:class='ui.base' x="102.51" y="100.81" width="109.5" height="109.5" transform="translate(-63.94 156.76) rotate(-45)")
    rect(:class='ui.base' x="180.04" y="178.35" width="110" height="110" transform="translate(-96.16 234.55) rotate(-45)")
    rect(:class='ui.base' x="180.04" y="22.78" width="110" height="110" transform="translate(13.84 188.98) rotate(-45)")
    
    polygon(:class="ui.highlight" points="78.43 0 145.81 68.33 68.03 146.11 0 77.73 78.43 0")
    polygon(:class="ui.highlight" points="68.24 164.81 146.02 242.59 77.78 311.13 0 233.04 68.24 164.81")
</template>

<script setup lang="ts">
type Props = {
    ui?: {
        base?: string
        highlight?: string
    }
}
const props = defineProps<Props>()

const ui = computed(() => {
    const { 
        base = 'fill-slate-700 dark:fill-slate-300', 
        highlight = 'fill-primary-500 dark:fill-primary-600'
    } = props.ui || {}

    return { base, highlight }
})
</script>

<style lang="scss" scoped>
</style>
    