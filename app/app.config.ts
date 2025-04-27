import module from '@@/package.json'

export default defineAppConfig({
	name: 'Curriculum Vitae',
	version: module.version,
	author: module.author,
	ui: {
		colors: {
			primary: 'zinc',
			neutral: 'slate'
		}
	},
})
