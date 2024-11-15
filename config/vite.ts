import glsl from 'vite-plugin-glsl'
import type { NuxtConfig } from '@nuxt/schema'

export default <NuxtConfig['vite']>{
	plugins: [glsl()]
}
