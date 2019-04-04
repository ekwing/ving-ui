import { configure } from '@storybook/vue'

const context = require.context('..', true, /\.stories\.ts$/)

function loadStories() {
  context.keys().forEach(filename => context(filename))
}

configure(loadStories, module)
