import { storiesOf } from '@storybook/vue'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import VnButton from 'packages/button/src/button.vue'

storiesOf('Button 按钮', module)
  .addDecorator(withKnobs)
  .add('with text', () => ({
    components: { VnButton },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      text: {
        default: text('Text', 'Hello Ekwing')
      }
    },
    template: `<VnButton :disabled="disabled">{{ text }}</VnButton>`,
    methods: { action: linkTo('Button') }
  }))
