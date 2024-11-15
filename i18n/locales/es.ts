export default defineI18nLocale(async () => {
	return {
		portfolio: 'Portafolio | Portafolios',
		app: {
			name: '@:portfolio',
			description: 'Curriculum Vitae',
		},
		greetings: {
			hi: '¡Hola!',
			moorning: '¡Buenos días!',
			afternoon: '¡Buenas tardes!',
			evening: '¡Buenas noches!'
		},
		presentation: "Mi nombre es { name } y soy { job }",
		theme: {
			name: 'Tema | Temas',
			light: 'Claro',
			dark: 'Oscuro',
			system: 'Sistema'
		},
		language: {
			name: 'Idioma | Idiomas',
			option: '@:option.name de idioma',
			select: 'Selecciona un @.lower:language.name'
		},
		search: {
			empty: 'No se encontraron datos',
		},
		navigation: {
			name: 'Navegación | Navigaciones',
			settings:   'Configuración | Configuraciones'
		},
		option: {
			name: 'Opción | Opciones'
		},
		color: {
			name: 'Color | Colores',
			option: '@:option.name de color',
			blue: 'Azul', 
			red: 'Rojo', 
			orange: 'Naranja', 
			yellow: 'Amarillo', 
			emerald: 'Verde esmeralda', 
			sky: 'Azul cielo', 
			violet: 'Violeta', 
			rose: 'Rosa',
			indigo: 'Índigo'
		},
		menu: {
			sr: 'Abrir el menú principal'
		},
		state: {
			loading: 'Cargando'
		},
		back: {
			name: 'Retroceder',
			sr: 'Retrocede a la página anterior'
		},
		section: {
			home: 'Inicio',
			experience: 'Experience',
			certificates: 'Certificados',
			skills: 'Skills',
			studies: 'Estudios'
		},
		share: {
			name: 'Compartir'
		}
	}
})
