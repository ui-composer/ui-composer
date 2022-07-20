// @ts-check

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  extends: ['./common', './react'],
  overrides: [
    {
      files: ['**/*.native.ts', '**/*.native.tsx'],
      env: {
        'react-native/react-native': true,
      },
      extends: ['@react-native-community'],
      plugins: ['react-native'],
    },
  ],
};

module.exports = config;
