<template lang="pug">
div(class='bg-primary-100/20 dark:bg-primary-900/20 max-w-full overflow-clip flex lg:items-center')
    u-container(class="flex h-full w-full flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 overflow-visible py-32 min-h-dvh relative")
        hero-image
        //- img(src='/api/favicon')
        div(class='flex flex-col gap-8 items-start grow z-20 basis-3/4')
            u-lazy(:delay='500' :transition class='grow flex w-full')
                div(class='flex flex-col md:flex-row lg:flex-col gap-8 grow')
                    div(class='flex flex-col gap-4 max-w-prose sm:max-w-sm lg:max-w-xl')
                        div(:class='ui.text.base' class="flex flex-col gap-2")
                            h1(class='uppercase font-display font-extrabold text-5xl max-w-prose sm:text-6xl lg:text-6xl') {{ t('greetings.hi') }}
                            //- h1 {{ data.lastName }}
                            h3(:class='ui.text.base' class='font-bold text-4xl lg:text-4xl text-balance') 
                                span(class='opacity-80') {{ t('presentation', { name: user.data?.name }) }} 
                                strong(class='text-primary-500 dark:text-primary-600') {{ user.data?.job }}
                                    //- span(class='flex gap-1 flex-col w-max reveal-animation')
                                        span(v-for='job in data?.job') {{ job }}
                                        span(v-for='job in data?.job') {{ job }}

                        p(:class='ui.text.base' class='opacity-70 text-base text-balance') {{ user.data?.description }}

                    u-lazy(:transition)
                        div(class='flex gap-y-3 gap-x-6 flex-col grow')
                            div(class='flex gap-y-3 gap-x-6 flex-wrap')
                                u-link-action(v-for='item in user.data?.portfolio' v-bind='item')

                            div(class='flex gap-y-3 gap-x-6 flex-wrap')
                                u-link-action(v-for='item, key in user.data?.contact' v-bind='item' :key)

                            u-link-action(:title='user.data?.location' icon='i-material-symbols:location-on-outline')



     
</template>

<script lang="ts" setup>
const { t } = useI18n()

const transition = { 
    name: 'transition-fade-t' 
}

const greetings = useGreetings()
const show = shallowRef(false)
onMounted(() => show.value = true)

const user = useUser()

const ui = {
    text: {
        base: 'text-slate-700 dark:text-slate-100',
    },
}
</script>

<style lang="scss" scoped>
@keyframes scale-up {
    from { 
        background-size: 100%;
        clip-path: inset(0 0 0 0%) 
    }
    to { 
        background-origin: right;
        background-size: 110%;
        clip-path: inset(0 0 0 100%) 
    }
}

@keyframes reveal {
    from, 5% {
        transform: translateY(-200%);
    }
    50%, 55% {
        transform: translateY(-100%);
    }

    95%, to {
        transform: translateY(0%);
    }
}

@media (prefers-reduced-motion: no-preference) {
    .scale-up-animation {
        animation: scale-up ease-in-out forwards;
        animation-timeline: view();
        animation-range: exit-crossing;
    }
    .reveal-animation {
        animation: reveal 5s cubic-bezier(.9,.01,.01,.9) infinite;
    }
}

</style>
