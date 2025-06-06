module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-use-before-define': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    'no-unused-expressions': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
  },
};
