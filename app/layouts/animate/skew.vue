 <template lang="pug">
u-main(ref='main' class='motion-safe:skew-y-(--skew) transition-[transform filter] duration-600 ease-out' :style)
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
	value: number
}

const emit = defineEmits<Emit>()
const props = withDefaults(defineProps<Props>(), {
	disabled: false
})

const reduceMotion = usePreferredReducedMotion()
const main = useTemplateRef<ComponentPublicInstance>('main')
const state: State = reactive({
	scroll: 0,
	pause: true,
	current: 0,
	ease: 0.75,
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
	if (!active.value || state.pause || reduceMotion.value === 'reduce') return

	const diff = state?.scroll - window.scrollY
	const clamp = Math.max(-30, Math.min(diff, 30))
	state.value = Math.round(clamp) * 0.1
	state.scroll = window.scrollY

	state.timer = setTimeout(() => {
		state.value = 0
		active.value = false
	}, 150)
}

const update = (event: Event) => {
	active.value = true
	if (import.meta.client) step()
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
