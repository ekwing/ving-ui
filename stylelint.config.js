module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'length-zero-no-unit': null,
    'at-rule-no-unknown': null,
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'scss/at-rule-no-unknown': true
  }
}
