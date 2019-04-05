import { configure, addDecorator, addParameters } from '@storybook/vue'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withInfo } from 'storybook-addon-vue-info'
import theme from './theme'

const context = require.context('..', true, /\.stories\.ts$/)

addDecorator(withInfo)
addParameters({
  options: {
    panelPosition: 'right',
    theme
  },
  viewport: {
    defaultViewport: 'iphone6',
    viewports: {
      ...INITIAL_VIEWPORTS
    }
  },
  info: true
})

function loadStories() {
  context.keys().forEach(filename => context(filename))
}

configure(loadStories, module)
