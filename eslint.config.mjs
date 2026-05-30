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
        { type: 'components', pattern: 'src/components/**/*' },
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
            { from: 'features', allow: ['components', 'lib', 'types'] },
            { from: 'components', allow: ['lib', 'types'] },
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
