<template lang="pug">
div(class='bg-primary-500 dark:bg-primary-600')
    u-container(class='py-12 flex flex-col sm:flex-row flex-wrap gap-8 sm:justify-between w-full')
        div(class='flex gap-x-6 gap-y-3 flex-wrap')
            favicon(:ui='ui.favicon' class='w-10')

            div(class='flex flex-col')
                h5(class='text-2xl font-bold tracking-wide text-primary-100 grow') {{ user.data?.name }}
                h6(class='text-base font-base text-primary-100/80 grow') {{ user.data?.job }}

        div(class='flex gap-y-3 gap-x-6 flex-col')
            div(class='flex gap-y-3 gap-x-6 flex-wrap')
                u-link-action(v-for='item in user.data?.portfolio' v-bind='item' :ui='ui.link' )

            div(class='flex gap-y-3 gap-x-6 flex-wrap')
                u-link-action(v-for='item, key in user.data?.contact' v-bind='item' :ui='ui.link')
        
</template>

<script lang="ts" setup>
const user = useUser()

const ui = {
    favicon: { 
        base: 'fill-primary-300 dark:fill-primary-900', 
        highlight: 'fill-primary-50 dark:fill-primary-200'
    },
    link: {
        text: 'text-base text-slate-100 dark:text-slate-100 hover:text-primary-200 dark:hover:text-primary-300'
    }
}
</script>

<style lang="scss" scoped>
</style>
