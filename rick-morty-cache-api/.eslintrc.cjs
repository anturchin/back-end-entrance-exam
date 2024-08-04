module.exports = {
  globals: {
    __dirname: 'readonly',
    module: 'readonly',
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
    },
  ],
  rules: {
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
};
