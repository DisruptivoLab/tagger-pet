/* eslint-env node */
module.exports = {
  root: true,
  env: { es2022: true, node: true, browser: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],
    // next-intl expone subrutas (p.ej. 'next-intl/server') vía package exports,
    // que a veces el resolver de eslint-plugin-import no detecta.
    // Ignoramos esos subpaths para evitar falsos positivos.
    'import/no-unresolved': [
      'error',
      { ignore: ['^next-intl/.*$'] }
    ],
    'react/react-in-jsx-scope': 'off'
  },
  ignorePatterns: ['**/dist/**', '**/build/**', '**/.next/**', 'node_modules/**']
};
