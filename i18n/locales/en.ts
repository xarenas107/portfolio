export default defineI18nLocale(async (locale) => {
	return {
		im: 'I\'m',
		itsme: 'This is me',
		portfolio: 'Portfolio | Portfolios',
		app: {
			name: '@:portfolio',
			description: 'Curriculum Vitae'
		},
		greetings: {
			hi: 'Hi there!',
			moorning: 'Good moorning!',
			afternoon: 'Good afternoon!',
			evening: 'Good evening!'
		},
		presentation: 'My name is { name } and I\'m a { job }',
		theme: {
			name: 'Theme | Themes',
			light: 'Light',
			dark: 'Dark',
			system: 'System'
		},
		language: {
			name: 'Language | Languages',
			option: 'Language @.lower:option.name',
			select: 'Select your @.lower:language.name'
		},
		search: {
			empty: 'No data found'
		},
		navigation: {
			name: 'Navigation | Navigations',
			settings: 'Setting | Settings'
		},
		option: {
			name: 'Option | Options'
		},
		color: {
			name: 'Color | Colors',
			option: 'Color @.lower:option.name',
			blue: 'Blue',
			red: 'Red',
			orange: 'Orange',
			yellow: 'Yellow',
			emerald: 'Green emerald',
			sky: 'Blue sky',
			violet: 'Violet',
			rose: 'Rose',
			indigo: 'Indigo',
			slate: 'Slate'
		},
		menu: {
			sr: 'Open main menu'
		},
		state: {
			loading: 'Loading'
		},
		back: {
			name: 'Back',
			sr: 'Return to previous page'
		},
		section: {
			home: 'Home',
			experience: 'Experience',
			certificates: 'Certificates',
			skills: 'Skills',
			studies: 'Studies'
		},
		share: {
			name: 'Share'
		}
	}
})
