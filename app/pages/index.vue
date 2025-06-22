<template lang="pug">
beta-section-home(v-intersect='intersect' :scale-down ref='section')#home
beta-section-studies(v-intersect='intersect' :scale-down ref='section')#studies
beta-section-certificates(v-intersect='intersect' :scale-down ref='section')#certificates
beta-section-experiences(v-intersect='intersect' :scale-down ref='section')#experiences
beta-section-skills(v-intersect='intersect' :scale-down ref='section')#skills

//- div(class='relative w-full min-h-[200svh] flex items-center justify-center overflow-clip motion-reduce:hidden py-24 bg-default')
//- 	div(class="scale-animation rounded-full bg-(--ui-bg-elevated)/50 p-8 aspect-square")
//- 		div(class="h-4 w-4 mask-animation bg-elevated rounded-full relative")

//- div(class='relative w-full h-[400svh] flex overflow-clip motion-reduce:hidden bg-gradient-to-t from-(--ui-primary)/10 to-(--ui-bg)')
	div(class="w-full px-4 sm:px-6 lg:px-8 m-auto max-w-7xl")
		section-title(v-intersect='intersect' class='sticky top-1/2 -translate-y-1/2 leading-0 mask-animation !block grow' hyphens) {{ t('section.portfolio') }}

beta-section-projects(v-if='portfolio' v-intersect='intersect' :scale-down ref='section')#portfolio
beta-section-footer(:scale-down)
</template>

<script lang="ts" setup>
definePageMeta({
	navbar: true,
	keepalive: true,
	viewTransition: false
})

type Props = {
	scaleDown?: boolean
}

const { data } = useNavigation()
const portfolio = computed(() => data.value.find(({ id }) => id === 'portfolio'))
// await new Promise(resolve => setTimeout(resolve, 10))
defineProps<Props>()

const { t } = useI18n()
const hash = useHashRoute()
const section = ref(null)

const intersect = [
	(entries: IntersectionObserverEntry[]) => {
		entries.forEach(({ isIntersecting, target }) => {
			if (isIntersecting) hash.value = target.id
		})
	}, {
		rootMargin: '5%',
		threshold: 0.25
	}
]
</script>

<style lang="scss">
// @keyframes scale-full {
// 	from, to {
// 		margin-left: calc(50% - 4ch);
// 	}
// 	from, 10% {
// 		opacity: 0;
// 		color: var(--ui-text);
// 	}
// 	20%, 60% {
// 		scale: 1;
// 		color: var(--ui-primary);
// 	}
// 	50%, 80% {
// 		opacity: 1;
// 	}
// 	to {
// 		color: var(--ui-primary);
// 		opacity: 0;
// 		scale: 200;
// 	}
// }

// @media (prefers-reduced-motion: no-preference) {
// 	.mask-animation {
// 		transform-origin: center;
// 		animation: scale-full ease both;
// 		animation-timeline: view();
// 		animation-range: 0% 100%
// 	}
// }
</style>
