<template lang='pug'>
u-lazy(:class='[{ grow }]' :disabled='!lazy' class="flex w-max min-w-fit max-w-full" as='li')
    div(:class='[{ grow }, styles.column]' class="grid")
        div(v-if='alternate' :class='[styles.size, { "order-1": alternate && reverse }]')
        div(class='flex shrink justify-center items-center relative' :class='horizontal ?  "row-auto" : "col-span-1 flex-col"')
            u-divider(
                v-if='progress > 0'
                :class='horizontal ? "left-0 divider" : "mt-4 top-0 divider-vertical"' 
                :ui='ui.progress'
                :style='`--progress: ${progress}%`' 
                :orientation 
                class='absolute grow z-20'
                size='md'
                )
            
            u-divider(:orientation :class='[{ "invisible": lineStart }, horizontal ? "hidden" : "h-4" ]' :ui='styles.divider')

            div(class='relative')
                span(v-if='highlight' class='motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full' :class='ui.dot')
                u-timeline-dot(:class='ui.dot' class='z-40')
            u-divider(:ui='styles.divider' :orientation class='grow')
        
        div(class='flex flex-col gap-4' :class='[ui.container, styles.spacing, styles.size, { "-order-1": alternate && reverse }]')
            div(class='flex flex-col gap-0 max-w-prose')
                div(v-if='title' class='flex gap-4')
                    h3(class="text-xl opacity-80 font-bold" :class='ui.text') {{ title }}
                    u-badge(v-if='badge' :label='badge' :ui='ui.badge' size='md' class='h-fit')

                h4(v-if='subtitle' class="text-base font-semibold" :class='ui.text') {{ subtitle }}
            
            div(class='flex flex-col gap-4 max-w-prose')
                p(v-if='content' :class='ui.text' class='text-base max-w-[40ch] text-balance') {{ content }}
                time(class="text-sm opacity-50 uppercase" :class='ui.text')  {{ time }}

</template>

<script lang='ts' setup>
type Props = {
    title?: string
    lazy?: boolean
    subtitle?: string
    badge?: string
    content?: string
    time?: string
    highlight?: boolean
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
    lineStart?:boolean
    grow?: boolean
    reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    ui: () => ({
        text: 'text-slate-900 dark:text-slate-100',
        dot: {}
    }),
})

const progress = defineModel('progress', { default: () => 0 })
const horizontal = computed(() => props.orientation === 'horizontal')
const styles = computed(() => {
    
    const alternate = props.alternate ? '-alternate' : ''

    return {
        divider: {
            border: {
                base: props.ui?.divider || 'border-slate-700 dark:border-primary-300'
            }
        },
        align: 'place-items-end text-end',
        size: props.alternate ? `${ horizontal.value ?  "h" : "w" }-5/12 ${ horizontal.value ?  "row-span-1" : "col-span-1" } basis-5/12 grow flex-auto` : `${ horizontal.value ?  "row-auto" : "col-span-5"}`,
        spacing: horizontal.value ? "mr-10" : "mb-10",
        column: horizontal.value ? `flex-col grid-rows-timeline${alternate} gap-6`: `grid-cols-timeline${alternate} grid-flow-col-dense gap-6`,
        animation: 'fade-bottom-animation'
    }
})

const ui = computed(() => {
    const {
        progress: _progress = 'border-primary-600 dark:border-primary-400',
        dot = {},
        text = 'text-slate-900 dark:text-primary-100'
    } = props.ui


    const { 
        base = 'bg-slate-700 dark:bg-slate-300', 
        active = 'bg-primary-600 dark:bg-primary-400 ring ring-primary-600 dark:ring-primary-400'
    } = dot


    return {
        text,
        dot: progress.value === 0 ?  base : active,
        badge: {
            color: {
                primary: {
                    solid: 'text-primary-600 dark:text-primary-900 bg-primary-300 dark:bg-primary-400'
                }
            },
            ...props.ui?.badge || {},
        },
        progress: {
            border: {
                base: `${_progress}`
            }
        },
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
