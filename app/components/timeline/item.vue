<template lang='pug'>
div(:class='[{ grow }, styles.column]' class="grid")
	div(v-if='alternate' :class='[ui.container, styles.spacing, { "order-1": alternate && reverse }]')
		//- div(class='bg-elevated/50 size-full rounded-lg')

	div(class='flex gap-2 shrink justify-center items-center relative' :class='horizontal ?  "row-auto" : "col-span-1 flex-col w-fit"')
		u-separator(
			v-if='progress > 0'
			:class='horizontal ? "left-0 divider" : "mt-4 top-0 divider-vertical"'
			:style='`--progress: ${progress}%`'
			:orientation
			:ui='styles.divider'
			class='absolute grow z-20'
			)

		u-separator(:orientation :class='[{ "hidden": !lineStart }, horizontal ? "w-4" : "h-4 block invisible" ]' :ui='styles.divider')

		div(class='relative')
			span(v-if='current' class='motion-safe:animate-ping absolute inline-flex size-full rounded-full' :class='ui.dot')
			timeline-dot(:class='ui.dot' class='z-40')

		u-separator(:ui='styles.divider' :orientation :class='{ "invisible": !lineEnd }')

	div(:class='[ui.container, styles.spacing, { "-order-1": alternate && reverse }]')
		div(class='flex flex-col gap-0')
			div(v-if='title' class='flex gap-4')
				primitive(:as='href ? "a" : "div"' :href class='flex gap-2 items-center')
					h3(class="text-xl font-bold text-balance w-auto" :class='ui.text') {{ title }}
					u-icon(v-if='href' name='i-heroicons:arrow-up-right-solid')
				div(class='grow')
					u-badge(v-if='badge' :label='badge' :ui='ui.badge' size='md' variant='subtle' class='h-fit text-nowrap')

			h4(v-if='subtitle' class="text-base font-semibold opacity-80" :class='ui.text') {{ subtitle }}

		div(class='flex flex-col gap-4')
			p(v-if='content' :class='ui.text' class='text-base opacity-80') {{ content }}

			div(:class='ui.text' class='text-sm opacity-60 uppercase gap-2')
				nuxt-time(:datetime='startAt' v-bind='options')
				span(v-if='current || endAt' v-text='" - "')
				span(v-if='current') {{  t('time.now') }}
				nuxt-time(v-else-if='endAt' :datetime='endAt' v-bind='options')
				span(v-if='location') {{ `, ${location}` }}

		nuxt-link(v-if='href' :href no-rel) {{ href }}
</template>

<script lang='ts' setup>
import { Primitive } from 'reka-ui'

type Props = {
	title?: string
	subtitle?: string
	badge?: string
	content?: string
	time?: string
	timeProps?: Intl.DateTimeFormatOptions
	startAt?: string | number | Date
	endAt?: string | number | Date
	location?: string
	current?: boolean
	href?: string
	ui?: {
		text?: string
		badge?: Record<string, unknown>
		divider?: string
		dot?: {
			base?: string
			active?: string
		}
		container?: string
		progress?: string
	}
	pending?: boolean
	orientation?: 'vertical' | 'horizontal'
	alternate?: boolean
	lineStart?: boolean
	lineEnd?: boolean
	grow?: boolean
	reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	ui: () => ({
		text: 'text-default',
		dot: {}
	}),
	startAt: () => Date.now(),
	lineEnd: true,
	timeProps: () => ({
		year: 'numeric',
		month: 'short'
	})
})

const { t, locale } = useI18n()
const progress = defineModel('progress', { default: 0 })
const horizontal = computed(() => props.orientation === 'horizontal')
const styles = computed(() => {
	return {
		divider: {
			border: props.ui?.divider || 'border-neutral-700 dark:border-primary-300'
		},
		align: 'place-items-end text-end',
		spacing: horizontal.value ? 'mr-10' : 'mb-10',
		column: {
			'gap-6': true,
			'grid-flow-col-dense grid-cols-[auto_1fr]': !horizontal.value,
			'grid-rows-[auto_1fr]': horizontal.value,
			'odd:grid-rows-[1fr_auto_1fr]': props.alternate
		},
		animation: 'fade-bottom-animation'
	}
})

const options = computed(() => {
	return {
		locale: locale.value,
		...props.timeProps
	}
})

const ui = computed(() => {
	const {
		progress: _progress = 'border-primary-600 dark:border-primary-400',
		dot = {},
		text = 'text-primary-50'
	} = props.ui

	const {
		base = 'bg-neutral-700 dark:bg-neutral-300',
		active = 'bg-primary-600 dark:bg-primary-400 ring ring-primary-600 dark:ring-primary-400'
	} = dot

	return {
		text,
		dot: progress.value === 0 ? base : active,
		container: 'flex flex-col gap-4 text-balance max-w-xs sm:max-w-sm',
		badge: {
			base: 'text-primary-800 dark:text-primary-600 bg-primary-400/50 dark:bg-primary-400/50',
			...props.ui?.badge || {}
		},
		progress: {
			border: {
				base: `${_progress}`
			}
		}
	}
})
</script>

<style lang='scss' scoped>
.divider {
    width: var(--progress);
    &-vertical { height: var(--progress) }
}

.grid {
  &-cols {
    &-timeline {
        grid-template-columns: auto 1fr;

        &-alternate {
            grid-template-columns: 1fr auto 1fr;
        }
    }
  }

  &-rows {
    &-timeline {
        grid-template-rows: auto 1fr;

        &-alternate {
            grid-template-rows: 1fr auto 1fr;
        }
    }
  }
}
</style>
