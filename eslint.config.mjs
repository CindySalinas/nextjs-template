import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import boundaries from 'eslint-plugin-boundaries'
import tsParser from '@typescript-eslint/parser'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    plugins: { boundaries },
    languageOptions: { parser: tsParser },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**/*' },
        { type: 'features', pattern: 'src/features/**/*' },
        { type: 'shared', pattern: 'src/components/shared/**/*' },
        { type: 'ui', pattern: 'src/components/ui/**/*' },
        { type: 'lib', pattern: 'src/lib/**/*' },
        { type: 'types', pattern: 'src/types/**/*' },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*', 'tests/**/*'],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['features', 'lib', 'types'] },
            { from: 'features', allow: ['shared', 'ui', 'lib', 'types'] },
            { from: 'shared', allow: ['ui', 'lib', 'types'] },
            { from: 'ui', allow: ['lib', 'types'] },
            { from: 'lib', allow: ['types'] },
            { from: 'types', allow: [] },
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message: 'Use path aliases (@/) instead of relative imports past one level',
            },
          ],
        },
      ],
    },
  },
])

export default eslintConfig
