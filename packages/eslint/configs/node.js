// @ts-check

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  extends: ['./common'],
  env: {
    node: true,
  },
  rules: {
    'no-console': 0,
  },
};

module.exports = config;
