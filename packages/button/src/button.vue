<template>
  <button
    class="vn-button"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      'vn-button--' + size,
      {
        'is-disabled': disabled,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    @click="handleClick"
  >
    <i v-if="icon" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class VnButton extends Vue {
  @Prop()
  private color!: string

  @Prop({ default: 'default', validator(value) { return ['default', 'medium', 'small', 'mini'].includes(value) } })
  private size!: string

  @Prop({ default: '' })
  private icon!: string

  @Prop({ default: 'button' })
  private nativeType!: string

  @Prop()
  private disabled!: boolean

  @Prop()
  private plain!: boolean

  @Prop()
  private round!: boolean

  @Prop()
  private circle!: boolean

  @Prop()
  private autofocus!: boolean

  @Emit('click')
  handleClick(event: string) {
    return event
  }
}
</script>

<style lang="scss">
@include b(button) {
  box-sizing: border-box;
  display: inline-block;
  padding: 32px 40px;
  margin: 0;
  font-size: 32px; /* px */
  line-height: 1;
  color: $--color-white;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  background-color: $--color-primary;
  border: none;
  border-radius: $--border-radius-base;
  outline: none;
  appearance: none;
  @include when(round) {
    padding: 32px 46px;
    border-radius: $--border-radius-round-base;
  }
  @include when(circle) {
    padding: 32px;
    border-radius: 50%;
  }
  @include m(medium) {
    padding: 26px 34px;
    font-size: 28px; /* px */
    @include when(round) {
      padding: 26px 40px;
      border-radius: $--border-radius-round-medium;
    }
    @include when(circle) {
      padding: 26px 26px;
      border-radius: 50%;
    }
  }
  @include m(small) {
    padding: 20px 28px;
    font-size: 24px; /* px */
    @include when(round) {
      padding: 20px 34px;
      border-radius: $--border-radius-round-small;
    }
    @include when(circle) {
      padding: 20px 20px;
      border-radius: 50%;
    }
  }
  @include m(mini) {
    padding: 14px 22px;
    font-size: 20px; /* px */
    @include when(round) {
      padding: 14px 28px;
      border-radius: $--border-radius-round-mini;
    }
    @include when(circle) {
      padding: 14px 14px;
      border-radius: 50%;
    }
  }
  @include when(plain) {
    color: $--color-primary;
    background-color: #fff;
    border: 1px solid $--color-primary; /* px */
  }
  @include when(disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
