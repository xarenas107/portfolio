export default () => {
    const mode = useColorMode()
    const color = toRefs(mode)

    return reactive({
        dark: computed(() => mode.value === 'dark'),
        ...color,
    })
}