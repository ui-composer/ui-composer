// @ts-check

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  plugins: [
    'prefer-arrow',
    'import',
    'prettier',
    '@typescript-eslint',
    'simple-import-sort',
    'codegen',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  settings: {
    // Without these settings for the import rule, the plugin wasn't correctly
    // finding typescript declaration files. Related:
    // https://github.com/benmosher/eslint-plugin-import/issues/1285
    'import/extensions': ['mjs', 'js', 'jsx', 'ts', 'tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['mjs', 'ts', 'tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['mjs', 'js', 'jsx', 'ts', 'tsx', '.macro.js'],
      },
    },
  },
  rules: {
    'codegen/codegen': 'error',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    // Ignore arg _
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
      },
    ],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    // Enables @ts-expect-error as long as a description is provided
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
      },
    ],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // ensures all expressions are used
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/member-ordering': 'off',
    // Used for mocked functions.
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': ['off', null],
    '@typescript-eslint/type-annotation-spacing': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-body-style': 'off',
    'arrow-parens': ['off', 'as-needed'],
    camelcase: 'off',
    // disable mangling of commented-out code
    'capitalized-comments': 'off',
    'comma-dangle': 'off',
    complexity: 'off',
    'constructor-super': 'error',
    curly: 'warn',
    'dot-notation': 'error',
    'eol-last': 'warn',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': ['error', 'any', 'String', 'string', 'Boolean', 'boolean', 'Undefined'],
    'id-match': ['error', 'testID|^(?!.*(ID$))'],
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': [
      'error',
      'never',
      {
        // Expo using .fx to denote file with side effects
        fx: 'always',
        native: 'always',
        woff: 'always',
        woff2: 'always',
        css: 'always',
        svg: 'always',
        png: 'always',
        jpg: 'always',
        macro: 'always',
        ttf: 'always',
      },
    ],
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md
    'import/named': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': 'error',
    // makes it harder to jump to code definitions
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
    'import/no-named-default': 'error',
    // no valid use case for this
    'import/no-self-import': 'error',
    'import/order': 'off',
    // prevent accidental redudent import paths
    'import/no-useless-path-segments': 'error',
    'import/no-default-export': 'off',
    'import/no-relative-parent-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'linebreak-style': 'off',
    'max-classes-per-file': 'off',
    'max-len': 'off',
    // limits the amount of the amount of params in a function
    'max-params': ['warn', 7],
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-alert': 'error',
    'no-async-promise-executor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-irregular-whitespace': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-wrappers': 'error',
    'no-shadow': 'off',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'off',
    'no-undef': 'off',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unsafe-finally': 'error',
    'no-useless-escape': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'object-shorthand': 'error',
    // disable grouping declaration of constants
    // https://eslint.org/docs/rules/one-var
    'one-var': ['error', 'never'],
    'prefer-arrow/prefer-arrow-functions': 'off',
    // use modern template literals
    // https://eslint.org/docs/rules/prefer-template
    'prefer-template': 'error',
    radix: 'error',
    // defer sorting to import/sort
    'sort-imports': 'off',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    // https://eslint.org/docs/rules/require-await
    'require-await': 'off',
    'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
    'space-before-function-paren': 'off',
    'space-in-parens': ['off', 'never'],
    'spaced-comment': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports first i.e. import "some-polyfill";
          ['^\\u0000'],
          // React, react-native, react prefixed imports, all other 3rd party imports
          ['^react$', '^react-native$', '^react', '^@?\\w'],
          // Design system
          ['^@ui-composer.*'],
          // Root level and App specifc imports
          ['^(~)(/.*)'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
  },
};

module.exports = config;
