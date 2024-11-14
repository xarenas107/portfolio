export default () => {
    const { theme } = useTailwind()
    const breakpoints = useBreakpoints(theme.screens)
    const mobile = breakpoints.smaller('lg')

    return {
        mobile: readonly(mobile),
        desktop: computed(() => !mobile.value),
        ...breakpoints,
    }
}