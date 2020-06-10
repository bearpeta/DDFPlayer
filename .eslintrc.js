module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'import',
    'jsx-a11y',
    'react-hooks',
  ],
  env: {
    'react-native/react-native': true,
  },
  extends: ['@react-native-community', 'prettier', 'prettier/react'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'lib/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'res/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'navigation/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'screens/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
