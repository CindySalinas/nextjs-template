import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import boundaries from 'eslint-plugin-boundaries'
import security from 'eslint-plugin-security'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts', 'storybook-static/**']),
  {
    plugins: {
      boundaries,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      security,
    },
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
      // ── Architecture boundaries ───────────────────────────────────────
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

      // ── Enforce path aliases ──────────────────────────────────────────
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

      // ── Import sorting ────────────────────────────────────────────────
      // Groups: 1) Node built-ins  2) External packages  3) Internal aliases  4) Relative
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // ── Unused imports ────────────────────────────────────────────────
      // unused-imports catches `import Foo from 'foo'` where Foo is never used.
      // @typescript-eslint/no-unused-vars only catches variable declarations.
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // ── Security ──────────────────────────────────────────────────────
      // Catches unsafe patterns: non-literal RegExp, eval, object injection, etc.
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-eval-with-expression': 'error',
      'security/detect-possible-timing-attacks': 'warn',
    },
  },
  // ── Test files: relax import rules ───────────────────────────────────────
  // Tests live outside src/ and legitimately import from messages/, root config, etc.
  {
    files: ['tests/**/*', 'vitest.config.ts', 'vitest.setup.ts', 'playwright.config.ts'],
    rules: {
      'no-restricted-imports': 'off',
      'boundaries/element-types': 'off',
    },
  },
  // ── Declaration files: relax structural rules ────────────────────────────
  // .d.ts files augment global types and must reference source files directly.
  {
    files: ['src/types/**/*.d.ts'],
    rules: {
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
])

export default eslintConfig
