<template lang="pug">
u-container(class="min-h-svh py-24 flex flex-col gap-8 lg:gap-16 relative")
    nuxt-img(src='https://mir-s3-cdn-cf.behance.net/project_modules/1400/3cac49141461249.66731ef195704.jpg' class="aspect-[10/4] w-full rounded-lg placeholder-active object-cover" )
    //- u-placeholder(class='aspect-w-12 aspect-h-4 w-full rounded-lg placeholder-active')

    div(class='flex flex-col gap-8 text-base')
        div(class='flex flex-col gap-2 sm:gap-4')
            h2(class="font-display tracking-tight font-bold text-2xl sm:text-4xl md:text-6xl max-w-prose text-balance") Título del proyecto
            h4(class="opacity-50 font-semibold text-lg sm:text-xl md:text-2xl max-w-prose text-balance") Descripción del proyecto

        p(class='hyphens-auto text-balance') Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</template>

<script lang="ts" setup>
const route = useRoute()
// const state = useState(`project:${route?.params?.id}`, () => ({}))
</script>

<style lang="scss" scoped>
.placeholder-active {
    view-transition-name: selected-project;
}

::view-transition-old(selected-project),
::view-transition-new(selected-project) {
  width: auto;
  height: 20px
}
</style>
