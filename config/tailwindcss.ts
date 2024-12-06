import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['tailwindcss']>{
	exposeConfig: true,
	config: {
		darkMode: 'media',
		theme: {
			extend: {
				// colors: {
				// 	blue: {
				// 		50: '#F2F4FF',
				// 		100: '#E8EBFC',
				// 		200: '#CCD5FF',
				// 		300: '#B3BFFF',
				// 		400: '#99AAFF',
				// 		500: '#8095FF',
				// 		600: '#6680FF',
				// 		700: '#1839E5',
				// 		800: '#001EB3',
				// 		900: '#001580'
				// 	}
				// },
				aspectRatio: {
					square: '1/1'
				},
				fontSize: {
					'10xl': '10rem',
					'11xl': '12rem',
					'12xl': '14rem',
					'13xl': '16rem',
					'14xl': '18rem'
				},
				// screens: {
				// 	'lg': '1360px',
				// 	'xl': '1880px',
				// 	'2xl': '2520px',
				// },
				fontFamily: {
					sans: ['Plus Jakarta Sans', 'Inter', 'Proxima Nova', 'ui-sans-serif', 'system-ui', 'sans-serif'],
					display: ['Khand', 'ui-sans-serif', 'system-ui', 'sans-serif'],
					superdisplay: ['Viva Kaiva', 'ui-sans-serif', 'system-ui', 'sans-serif']
				},
				keyframes: {
					float: {
						'0%, 100%': { transform: 'translateY(0)' },
						'50%': { transform: 'translateY(-10px)' }
					}
				},
				animation: {
					float: 'float 3s ease-in-out infinite'
				}
			}
		}
	}
}
