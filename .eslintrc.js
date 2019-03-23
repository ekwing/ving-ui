module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    'no-console': 0,
    'no-useless-escape': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        insertPragma: false,
        requirePragma: false
      }
    ],
    'import/no-useless-path-segments': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'import/exports-last': 'error',
    'import/group-exports': 'error',
    'simple-import-sort/sort': 'error',
    'vue/v-on-style': 'error',
    'vue/v-bind-style': 'error',
    'vue/html-quotes': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/no-multi-spaces': 'error',
    'vue/prop-name-casing': 'error',
    'vue/attributes-order': 'error',
    'vue/order-in-components': 'error',
    'vue/this-in-template': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      ignores: []
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
