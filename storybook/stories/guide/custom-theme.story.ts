import { Story } from '@storybook/vue'
import CustomThemeMarkdown from './custom-theme.md'

export default (stories: Story) => {
  stories
    .addParameters({
      readme: {
        content: CustomThemeMarkdown
      }
    })
    .add('自定义主题', () => `<div/>`)
}