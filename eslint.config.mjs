import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
	features: {
		tooling: true,
		stylistic: {
			indent: 'tab',
			braceStyle: '1tbs',
			commaDangle: 'never'
		},
	},
})
	.override('nuxt/configs', {
		rules: {
			'import/order': 'off',
		},
	})
	.override('nuxt/stylistic', {
		rules: {
			'@typescript-eslint/unified-signatures': 'off',
		},
	})
	.override('nuxt/typescript/rules', {
		rules: {
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-dynamic-delete': 'off',
			'@typescript-eslint/prefer-ts-expect-error': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-invalid-void-type': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
		},
	})
	.override('nuxt/vue/rules', {
		rules: {
			'vue/multi-word-component-names': 'off',
			'vue/require-prop-types': 'off',
		},
	})
