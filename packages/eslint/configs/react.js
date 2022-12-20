// @ts-check

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  plugins: ['react', 'react-hooks'],
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    node: true,
  },
  rules: {
    'react/display-name': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'first',
        ignoreCase: true,
      },
    ],
    'react/no-unescaped-entities': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
    'react/jsx-boolean-value': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/jsx-uses-react': 'error',
    // jsx components should have the correct file extensions
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx', '.mdx'],
      },
    ],
    // allow multiple react components in a file
    'react/no-multi-comp': 'off',
    // disable because this doesn't recognize React.memo. It only looks for shouldComponentUpdate
    'react/require-optimization': 'off',
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    // Types can be infered, this rule blocks that. Example:
    //
    // ```What they want
    // interface Props { A: string }
    //
    // const Component = ({ A }: Props) => {};
    // ```
    //
    // ```What we want
    // interface Props { A: string }
    //
    // const Component: React.FC<Props> = ({ A }) => {};
    // ```
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
  },
};

module.exports = config;
