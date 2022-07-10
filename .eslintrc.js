module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['./packages/config/eslint/common'],
};
