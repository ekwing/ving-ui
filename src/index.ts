import { VueConstructor, PluginObject } from 'vue'

const files = require.context('../packages', true, /index\.ts$/)
const modules: PluginObject<any> = {
  install(vue: VueConstructor) {
    Object.entries(modules).map(([name, component]) => {
      if (name === 'install') return
      component.install(vue)
    })
  }
}

files.keys().forEach(key => {
  const matches = key.match(/\/(.*)\/index\.ts$/)
  if (matches) {
    modules[matches[1]] = files(key).default
  }
})

export default modules
