import { linkTo } from '@storybook/addon-links'
import { text, boolean } from '@storybook/addon-knobs'
import VnButton from 'packages/button/src/button.vue'
import { Story } from '@storybook/vue'

export default (stories: Story) => {
  stories
    .add('Button 按钮', () => ({
    components: { VnButton },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      text: {
        default: text('Text', 'Hello Ekwing')
      }
    },
    template: `<VnButton :disabled="disabled">{{ text }}</VnButton>`
  }))
}