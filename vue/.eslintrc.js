module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'prettier/standard',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', 'prettier'],
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('@vue/cli-service/webpack.config.js')
      }
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'vue/component-name-in-template-casing': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/max-attributes-per-line': "off",
    'no-underscore-dangle':"off",
    'no-console': 'off',
  },
}
