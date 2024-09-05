import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				window: 'readonly',
				document: 'readonly',
				console: 'readonly',
				__dirname: 'readonly',
				Event: 'readonly',
				HTMLFormElement: 'readonly',
				FormData: 'readonly',
				HTMLElement: 'readonly',
				HTMLTemplateElement: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'no-unused-vars': 'off', // Выключаем стандартное правило no-unused-vars
			'no-redeclare': ['error', { builtinGlobals: true }],
			'no-undef': 'off',
			'no-console': 'off',
			'no-tabs': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
		},
	},
	{
		files: ['server.js', 'vite.config.mjs'],
		languageOptions: {
			globals: {
				__dirname: 'readonly',
				console: 'readonly',
			},
		},
	},
];
