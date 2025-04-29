<template lang="pug">
beta-section-hero(v-intersect='intersect' :scale-down ref='section')#home
beta-section-studies(v-intersect='intersect' :scale-down ref='section')#studies
beta-section-certificates(v-intersect='intersect' :scale-down ref='section')#certificates
beta-section-experiences(v-intersect='intersect' :scale-down ref='section')#experience
beta-section-skills(v-intersect='intersect' :scale-down ref='section')#skills

div(class='relative w-full min-h-[200svh] flex items-center justify-center overflow-clip motion-reduce:hidden py-24 bg-default')
	div(class="scale-animation rounded-full bg-(--ui-bg-elevated)/50 p-8 aspect-square")
		div(class="h-4 w-4 mask-animation bg-elevated rounded-full relative")

beta-section-projects(v-intersect='intersect' :scale-down ref='section')#projects
beta-section-footer(:scale-down)
</template>

<script lang="ts" setup>
definePageMeta({
	navbar: true,
	keepalive: true
})

type Props = {
	scaleDown?: boolean
}
defineProps<Props>()

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
@keyframes scale {
	from, 30% { scale: 1 }
	to { scale: 100 }
}

@keyframes scale-full {
	from, 20% { scale: 0 }
	to { scale: 10 }
}

@keyframes opacity {
	from { background: var(--bg-neutral-500) }
}

@media (prefers-reduced-motion: no-preference) {
	.mask-animation {
		animation: scale-full ease both;
		animation-timeline: view();
		animation-range: 0svh 150svh
	}

	.scale-animation {
		animation: scale ease both;
		animation-timeline: view();
		animation-range: 0svh 100svh
	}

	.opacity-animation {
		animation: opacity linear both;
		animation-timeline: view();
		animation-range: 100svh 150svh;
	}
}

.mask-favicon {
	--logo: url('/api/favicon');
	-webkit-mask-image: var(--logo);
	mask-image: var(--logo);
	mask-repeat: no-repeat;
	mask-origin: center;
	mask-position: center center;
}
</style>
