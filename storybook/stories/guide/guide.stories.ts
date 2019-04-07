import { storiesOf } from '@storybook/vue'
import { addStories } from 'storybook/utils'

const stories = storiesOf('开发指南', module)
  .addParameters({
    options: {
      showPanel: false
    },
    viewport: {
      defaultViewport: ''
    }
  })

const context = require.context('.', true, /\.story\.ts$/)

addStories(stories, context, [
  'quick-start',
  'custom-theme'
])