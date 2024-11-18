import module from '@@/package.json'

export default defineAppConfig({
	name: 'Curriculum Vitae',
	version: module.version,
	author: module.author,
	ui: {
		primary: 'slate',
		badge: {
			rounded: 'rounded-full',
			color: {
				primary: {
					solid: 'text-primary-200 dark:text-primary-200 bg-primary-700 dark:bg-primary-700',
					soft: 'text-primary-700 dark:text-primary-700 bg-primary-700/10 dark:bg-primary-700/10'
				}
			},
			variant: {
				solid: 'bg-{color}-700 dark:bg-{color}-700 text-{color}-200 dark:text-{color}-200',
				soft: 'bg-{color}-700 dark:bg-{color}-700 dark:bg-opacity-10 text-{color}-700 dark:text-{color}-700'
			}
		},
		card: {
			ring: 'ring-0',
			shadow: 'shadow-none',
			divide: 'divide-none'
		},
		selectMenu: {
			default: {
				color: 'primary'
			}
		}
	}
})
