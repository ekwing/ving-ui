import { storiesOf } from '@storybook/vue'
import { addStories } from 'storybook/utils'

const stories = storiesOf('Form', module)
const context = require.context('.', true, /\.story\.ts$/)

addStories(stories, context)
