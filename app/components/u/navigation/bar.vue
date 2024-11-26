<template lang="pug">
nav(v-if='active' class="bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 fixed w-full top-0 z-50 transition-transform" :class='[classes, { "-translate-y-full": sticky && !reveal }]')

  div(:class="ui.container.base")
    div(class="relative flex h-16 items-center justify-between gap-1.5")
      div(class="inset-y-0 left-0 flex items-center lg:hidden")
        //- Mobile menu button
        u-button(@click='toggle' :aria-expanded="menu" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:dark:text-slate-100 hover:bg-slate-400/50 hover:dark:bg-slate-600/50 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-slate-600/50 dark:focus:ring-slate-300/50" aria-controls="mobile-menu" variant='ghost')
            span(class="absolute -inset-0.5")
            span(class="sr-only") {{ t('menu.sr') }}

            //- icon menu
            u-icon(class='w-6 h-6' :name='menu ? "i-heroicons-outline:x": "i-heroicons-solid:menu-alt-2"')

      div(class="flex flex-1 items-center sm:items-stretch sm:justify-start")
        div(v-if='!slot.left' class='flex gap-6')
          div(v-if='!slot.avatar' class="hidden shrink-0 xl:flex")
            lazy-favicon(class="h-8 w-auto")
            //- nuxt-img(class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="brand")

          slot(name='avatar')

          div(class="hidden lg:flex")
            div(class="flex gap-1.5")
              u-tooltip(v-for='{ to, icon, label, id, active, shortcut }, index in navigation.data'  :text="label" :shortcuts="shortcut" :prevent='active')
                u-navigation-link(@click='navigate(id)' :active :icon :label :aria-current='active' :shortcut)

        slot(name='left' :menu)

      div(class="absolute inset-y-0 right-0 items-center gap-1.5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden md:flex")

        div(v-if='!slot.right' class='flex gap-1.5 sm:flex')
          u-share-button
          u-language-select
          u-color-select
          u-theme-toggle

        slot(name='rigth' :menu)

    slot(:menu :reveal :top)

  //- Mobile menu, show/hide based on menu state
  u-slideover(v-model='menu' id='mobile-menu' side='top' class='lg:hidden')
    u-card(:ui='ui.card')
      template(#header)
        div(class="flex items-center justify-between")
          u-button(@click="toggle()" color="gray" variant="ghost" icon="i-heroicons-outline:x" class="relative inline-flex items-center justify-center rounded-md p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:dark:text-slate-100 hover:bg-slate-400/50 hover:dark:bg-slate-600/50 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-slate-600/50 dark:focus:ring-slate-300/50" aria-controls="mobile-menu")

          u-share-button(class='p-2')
      div(class='flex flex-col gap-8 grow')

        div(class='flex flex-col gap-4')
          h6(class='text-slate-700 dark:text-slate-100 text-bold text-sm') {{ t('navigation.name') }}
          ul(class='flex flex-col gap-1')
            li(v-for='{ to, icon, label, id, active } in navigation.data')
              u-navigation-link(@click='navigate(id)' :active  :icon :label :aria-current='active')

        div(class='flex flex-col gap-4 grow md:hidden')
          h6(class='text-slate-700 dark:text-slate-100 text-bold text-sm') {{ t('navigation.settings', 2) }}

          div(class='flex flex-col flex-wrap gap-1 grow w-full place-content-between')
            u-language-select(class='grow')
            u-color-select(show-label class='grow')
            u-theme-toggle(show-label class='grow')
</template>

<script setup lang="ts">
type Props = {
	active?: boolean
	sticky?: boolean
}

const slot = useSlots()
const { t } = useI18n()
const hash = useHashRoute()

defineProps<Props>()

const navigation = useNavigation()

const menu = defineModel('menu', { default: () => false })
const classes = shallowRef('bg-opacity-95 dark:bg-opacity-90 border-b backdrop-blur')
const top = shallowRef(0)
const reveal = shallowRef(true)

const toggle = () => menu.value = !menu.value
const navigate = (value: string) => {
	hash.value = value
	menu.value = false
	reveal.value = true

	const element = document.querySelector(`#${value}`)
	element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const recolor = () => {
	// Remove opacity on scroll top
	classes.value = window.scrollY === 0
		? 'bg-opacity-0 dark:bg-opacity-0'
		: 'bg-opacity-95 dark:bg-opacity-90 border-b backdrop-blur'
}

const hide = () => {
	reveal.value = window.scrollY < 500 || top.value > window.scrollY
	top.value = window.scrollY
}

useEventListener('scroll', () => {
	recolor()
	hide()
})

const ui = {
	card: {
		body: {
			base: 'flex-1'
		},
		ring: '',
		divide: 'divide-y divide-slate-100 dark:divide-slate-700'
	},
	container: {
		base: 'mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'
	}
}

onMounted(recolor)
</script>

<style scoped>

</style>
