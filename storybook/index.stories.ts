import { storiesOf } from '@storybook/vue'
import VnButton from 'packages/button/src/button.vue'
import { linkTo } from '@storybook/addon-links'

storiesOf('Button', module)
  .add('with text', () => ({
    components: { VnButton },
    template: '<VnButton/>',
    methods: { action: linkTo('Button') }
  }))
