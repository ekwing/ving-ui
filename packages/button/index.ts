import { VueConstructor } from 'vue'
import VnButton from './src/button.vue'

export default {
  ...VnButton,
  install(Vue: VueConstructor) {
    Vue.component(VnButton.name, VnButton)
  }
}
