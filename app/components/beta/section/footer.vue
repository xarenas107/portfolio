<template lang="pug">
div(class='bg-default border-t border-accented')
    u-container(v-bind='options' class='py-4 sm:py-6 lg:py-8 flex flex-col sm:flex-row flex-wrap gap-8 sm:justify-between w-full')
        div(class='flex gap-4 flex-wrap items-center')
            favicon(class='w-10')

            div(class='flex flex-col gap-1')
                h5(class='text-xl font-black text-highlighted') {{ data?.name }}
                h6(class='text-sm font-semibold text-muted') {{ data?.job }}

        div(class='flex gap-y-3 gap-x-6 flex-wrap max-w-sm')
            u-link-action(v-for='item in data?.portfolio' v-bind='item')
            u-link-action(v-for='item in data?.contact' v-bind='item')
            u-link-action(:title='data?.location' icon='i-material-symbols:location-on-outline')
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
