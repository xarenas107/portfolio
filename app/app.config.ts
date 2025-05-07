import module from '@@/package.json'

export default defineAppConfig({
	name: 'Curriculum Vitae',
	version: module.version,
	author: module.author,
	ui: {
		colors: {
			primary: 'zinc',
			neutral: 'slate'
		},
		drawer: {
			compoundVariants: [
				{
					direction: 'top',
					inset: false,
					class: {
						content: 'inset-x-0 top-0 rounded-b-none'
					}
				},
				{
					direction: 'bottom',
					inset: false,
					class: {
						content: 'inset-x-0 bottom-0 rounded-t-none'
					}
				}
			]
		}
	}
})
