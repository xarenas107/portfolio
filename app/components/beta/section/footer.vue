<template lang="pug">
div(class='bg-default border-t border-accented pb-16 lg:pb-0')
    u-container(v-bind='options' class='py-4 lg:py-8 flex flex-col sm:flex-row flex-wrap gap-8 sm:justify-between w-full')
        div(class='flex gap-x-6 gap-y-3 flex-wrap')
            favicon(class='w-10')

            div(class='flex flex-col grow')
                h5(class='text-xl font-black text-(--ui-text-highlighted) grow') {{ data?.name }}
                h6(class='text-sm font-semibold text-(--ui-text-muted) grow') {{ data?.job }}

        div(class='flex gap-y-3 gap-x-6 flex-col')
            div(class='flex gap-y-3 gap-x-6 flex-wrap')
                u-link-action(v-for='item in data?.portfolio' v-bind='item')

            div(class='flex gap-y-3 gap-x-6 flex-wrap')
                u-link-action(v-for='item in data?.contact' v-bind='item')
</template>

<script lang="ts" setup>
type Props = {
	scaleDown?: boolean
}
const props = defineProps<Props>()

const options = computed(() => {
	const base = 'transition-transform duration-200 ease-out'

	return {
		class: props.scaleDown ? `scale-90 ${base}` : base
	}
})
const { data } = useUser()
</script>

<style lang="scss" scoped>
</style>
