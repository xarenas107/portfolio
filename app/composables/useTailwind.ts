// import config from '#tailwind-config'
import colors from 'tailwindcss/colors'

export default () => {
	// reactive(config)
	return reactive({
		theme: { colors }
	})
}
