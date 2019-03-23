const files = require.context('../packages', true, /index\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.match(/\/(.*)\/index\.js$/)[1]] = files(key).default
})

// eslint-disable-next-line
modules.install = vue => Object.entries(modules).map(([name, component]) => {
    if (name === 'install') return
    component.install(vue)
  })

export default modules
