module.exports = {
  extends: [
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/no-namespace': 'off'
  },
  ignorePatterns: [
    ''
  ]
}
