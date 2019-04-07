import { Story } from '@storybook/vue'
import QuickStartMarkdown from './quck-start.md'

export default (stories: Story) => {
  stories
    .addParameters({
      readme: {
        content: QuickStartMarkdown
      }
    })
    .add('快速上手', () => `<div/>`)
}