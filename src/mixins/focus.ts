import { Component, Vue } from 'vue-property-decorator'

export default function(ref: string) {

  @Component
  class FoucsComponent extends Vue {
    focus() {
      const el: any = this.$refs[ref]
      el.focus && el.focus()
      this.$slots.default
    }
  }

  return FoucsComponent
}
