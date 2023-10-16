module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    es2020: true,
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs', '!.storybook'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier-plugin-organize-imports'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-console': 'error',
    eqeqeq: ['error', 'always'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
  },

  settings: {
    'import/ignore': ['node_modules'],

    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },

    'import/resolver': {
      node: {
        paths: ['.', './src'],
        extensions: ['.tsx', '.ts'],
      },

      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // use <root>/path/to/folder/tsconfig.json
        project: './tsconfig.json',
      },
    },
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['react', '@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:storybook/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        // typescript type checking temporary disabled
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',

        // react/recommended
        'react/jsx-key': 'error',
        'react/prop-types': 'error',
        'react/display-name': 'error',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      files: ['src/**/*'],
      plugins: ['react', '@typescript-eslint', 'prefer-arrow'],
      extends: [
        'eslint:recommended',
        'plugin:eslint-comments/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        // To remove when they are globally enabled back
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/array-type': 'error',
        'eslint-comments/no-unused-disable': 'error',
        'func-style': ['error', 'expression', { allowArrowFunctions: true }],
        'prefer-arrow/prefer-arrow-functions': [
          'error',
          {
            disallowPrototype: true,
            singleReturnOnly: false,
            classPropertiesAllowed: false,
          },
        ],
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};
