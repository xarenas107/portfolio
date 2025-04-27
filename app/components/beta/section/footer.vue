<template lang="pug">
div(class='bg-default border-t border-default')
    u-container(class='py-12 flex flex-col sm:flex-row flex-wrap gap-8 sm:justify-between w-full')
        div(class='flex gap-x-6 gap-y-3 flex-wrap')
            favicon(class='w-10')

            div(class='flex flex-col grow')
                h5(class='text-2xl font-black text-(--ui-text-highlighted) grow') {{ user.data?.name }}
                h6(class='text-sm font-semibold text-(--ui-text-muted) grow') {{ user.data?.job }}

        div(class='flex gap-y-3 gap-x-6 flex-col')
            div(class='flex gap-y-3 gap-x-6 flex-wrap')
                u-link-action(v-for='item in user.data?.portfolio' v-bind='item')

            div(class='flex gap-y-3 gap-x-6 flex-wrap')
                u-link-action(v-for='item in user.data?.contact' v-bind='item')
</template>

<script lang="ts" setup>
const user = useUser()
</script>

<style lang="scss" scoped>
</style>
