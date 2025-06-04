interface DimensionProps {
	height?: number | string
	maxHeight?: number | string
	maxWidth?: number | string
	minHeight?: number | string
	minWidth?: number | string
	width?: number | string
}

function convertToUnit(str: string | number | null | undefined, unit = 'px'): string | undefined {
	if (str == null || str === '') return undefined

	const num = Number(str)
	if (Number.isNaN(num)) return String(str)
	else if (!Number.isFinite(num)) return undefined
	else return `${num}${unit}`
}

export default (props: DimensionProps) => {
	return computed(() => {
		const styles: Record<string, any> = {}
		const height = convertToUnit(props.height)
		const maxHeight = convertToUnit(props.maxHeight)
		const maxWidth = convertToUnit(props.maxWidth)
		const minHeight = convertToUnit(props.minHeight)
		const minWidth = convertToUnit(props.minWidth)
		const width = convertToUnit(props.width)

		if (height != null) styles.height = height
		if (maxHeight != null) styles.maxHeight = maxHeight
		if (maxWidth != null) styles.maxWidth = maxWidth
		if (minHeight != null) styles.minHeight = minHeight
		if (minWidth != null) styles.minWidth = minWidth
		if (width != null) styles.width = width

		return styles
	})
}
