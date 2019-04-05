import { configure, addDecorator, addParameters } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import theme from './theme'

const context = require.context('..', true, /\.stories\.ts$/)

addDecorator(withInfo)
addParameters({
  options: {
    theme
  }
})

function loadStories() {
  context.keys().forEach(filename => context(filename))
}

configure(loadStories, module)
