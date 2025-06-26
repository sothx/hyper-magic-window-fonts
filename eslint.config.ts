import path from 'node:path';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config([
	eslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				sourceType: 'module',
				ecmaVersion: 'latest',
				tsconfigRootDir: path.resolve(import.meta.dirname),
			},
		},
		rules: {
			'prettier/prettier': 'off',
			eqeqeq: ['error', 'always'],
		},
	},
	{
		ignores: ['**/node_modules/**', '**/dist/**'],
	},
]);
