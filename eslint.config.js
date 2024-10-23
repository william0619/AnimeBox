import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import checkFile from 'eslint-plugin-check-file'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      tailwindcss: tailwindcss,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'check-file': checkFile
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'check-file/filename-naming-convention': [
        'error',
        { '**/!(__)*': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true }
      ],
      'check-file/folder-naming-convention': ['error', { '**/!(__tests__)': 'KEBAB_CASE' }]
    }
  }
)
