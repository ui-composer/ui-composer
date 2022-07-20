// @ts-check

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  overrides: [
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/__tests__/*.ts',
        '**/__tests__/*.tsx',
        '**/jest/**',
      ],
      env: {
        'jest/globals': true,
      },
      extends: ['plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-uses-react': 0,
        'react/react-in-jsx-scope': 0,
        'no-restricted-globals': 'off',
      },
    },
  ],
};

module.exports = config;
