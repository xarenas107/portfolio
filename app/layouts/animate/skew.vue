 <template lang="pug">
u-main(ref='main' class='motion-safe:skew-y-(--skew) transition-[transform filter] duration-600 ease-out')
    slot
</template>

<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue'

type Emit = {
	(event: 'scroll', value: Event): void
}

type Props = {
	disabled?: boolean
}

type State = {
	scroll: number
	timer?: NodeJS.Timeout
	pause?: boolean
	current: number
	ease: number
}

const emit = defineEmits<Emit>()
const props = withDefaults(defineProps<Props>(), {
	disabled: false
})

const reduceMotion = usePreferredReducedMotion()
const main = useTemplateRef<ComponentPublicInstance>('main')
const state: State = {
	scroll: 0,
	pause: true,
	current: 0,
	ease: 0.75
}

const active = useState('scroll:active', () => false)

const update = (event: Event) => {
	active.value = true
	if (state.pause || reduceMotion.value === 'reduce') return

	const diff = state?.scroll - window.scrollY
	const clamp = Math.max(-30, Math.min(diff, 30))
	const speed = Math.round(clamp) * 0.1

	const element = main.value?.$el as HTMLElement

	if (element) {
		element.style.setProperty('--skew', `${speed}deg`)
		element.style.setProperty('--transition-porperty', 'transform filter')
	}

	state.scroll = window.scrollY

	if (state.timer) clearTimeout(state.timer)
	state.timer = setTimeout(() => {
		if (element) element.style.setProperty('--skew', `0deg`)
		active.value = false
	}, 150)

	emit('scroll', event)
}

useEventListener('scroll', update, {
	passive: true
})

onBeforeUpdate(() => {
	state.pause = true
})

onUpdated(() => {
	setTimeout(() => state.pause = props.disabled, 300)
})

onMounted(() => {
	state.scroll = window.scrollY
	state.pause = props.disabled
})
</script>

<style lang='scss'>
</style>
