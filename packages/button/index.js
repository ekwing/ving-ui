import EkButton from './src/button'

/* istanbul ignore next */
EkButton.install = function(Vue) {
  Vue.component(EkButton.name, EkButton)
}

export default EkButton
