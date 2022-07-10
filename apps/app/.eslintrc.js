module.exports = {
  // extends: ['universe/native', '../../packages/eslint/plugins/mobile'],
  extends: ['../../packages/config/eslint/mobile'],
  overrides: [
    {
      files: ['*.tsx', 'src/**/*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
      },
    },
  ],
};
