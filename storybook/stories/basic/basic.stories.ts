import { storiesOf } from '@storybook/vue'
import { addStories } from 'storybook/utils'

const stories = storiesOf('Basic 基础组件', module)
const context = require.context('.', true, /\.story\.ts$/)

addStories(stories, context)
