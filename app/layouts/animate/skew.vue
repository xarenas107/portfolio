 <template lang="pug">
u-main(ref='main' class='motion-safe:skew-y-(--skew) transition-[transform filter] duration-300 ease-out' :style)
	slot
</template>

<script lang="ts" setup>
type Emit = {
	(event: 'scroll', value: Event): void
}

type Props = {
	disabled?: boolean
	blur?: boolean
}

type State = {
	scroll: number
	timer?: NodeJS.Timeout
	pause?: boolean
	current: number
	ease: number
	value: number
}

const emit = defineEmits<Emit>()
const props = withDefaults(defineProps<Props>(), {
	disabled: false
})

const reduceMotion = usePreferredReducedMotion()

const state: State = reactive({
	scroll: 0,
	pause: true,
	current: 0,
	ease: 0.1,
	value: 0
})

const style = computed(() => {
	return {
		'--skew': `${state.value}deg`
	}
})

const active = useState('scroll:active', () => false)

const step = () => {
	if (state.timer) clearTimeout(state.timer)
	if (!active.value || state.pause) return

	const diff = state?.scroll - window.scrollY
	const clamp = Math.max(-30, Math.min(diff, 30))
	state.value = Math.round(clamp) * state.ease
	state.scroll = window.scrollY

	state.timer = setTimeout(() => {
		state.value = 0
		active.value = false
	}, 200)
}

const update = (event: Event) => {
	active.value = true
	emit('scroll', event)
	if (reduceMotion.value === 'reduce') return
	if (import.meta.client) step()
}

useEventListener('scroll', update, {
	passive: true
})

onBeforeUpdate(() => {
	state.pause = true
})

onUpdated(() => {
	state.pause = props.disabled
})

onMounted(() => {
	state.scroll = window.scrollY
})
</script>
