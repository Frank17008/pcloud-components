module.exports = {
  printWidth: 160,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
  pluginSearchDirs: false,
  overrides: [{ files: '*.md', options: { proseWrap: 'preserve' } }],
  plugins: [require.resolve('prettier-plugin-organize-imports'), require.resolve('prettier-plugin-packagejson')],
};
