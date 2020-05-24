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
};
