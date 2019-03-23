<template>
  <div
    class="demo-block demo-zh-CN"
    :class="{ hover: hovering }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <slot name="source"></slot>
    <div ref="meta" class="meta">
      <div v-if="$slots.default" class="description">
        <slot></slot>
      </div>
      <slot name="highlight"></slot>
    </div>
    <div
      ref="control"
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <span :class="['arrow-icon', { hovering: hovering }]">{{ isExpanded ? '&#9652;' : '&#9662;' }}</span>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    jsfiddle: Object,
    default() {
      return {}
    }
  },
  data() {
    return {
      hovering: false,
      isExpanded: false,
      fixedControl: false
    }
  },

  computed: {
    controlText() {
      return this.isExpanded ? '隐藏代码' : '显示代码'
    },

    codeArea() {
      return this.$el.getElementsByClassName('meta')[0]
    },

    codeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return (
          this.$el.getElementsByClassName('description')[0].clientHeight +
          this.$el.getElementsByClassName('highlight')[0].clientHeight +
          20
        )
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight
    }
  },

  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
      if (!val) {
        this.fixedControl = false
        this.$refs.control.style.left = '0'
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      let highlight = this.$el.getElementsByClassName('highlight')[0]
      if (this.$el.getElementsByClassName('description').length === 0) {
        highlight.style.width = '100%'
        highlight.borderRight = 'none'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 24px;
  }

  .meta {
    height: 0;
    overflow: hidden;
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    transition: height 0.2s;
  }

  .description {
    box-sizing: border-box;
    padding: 20px;
    margin: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    background-color: #fff;
    border: solid 1px #ebebeb;
    border-radius: 3px;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      display: inline-block;
      height: 18px;
      padding: 1px 5px;
      margin: 0 4px;
      font-size: 12px;
      line-height: 18px;
      color: #5e6d82;
      background-color: #e6effb;
      border-radius: 3px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      max-height: none;
      margin: 0;
      border: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

  .demo-block-control {
    position: relative;
    box-sizing: border-box;
    height: 44px;
    margin-top: -1px;
    color: #d3dce6;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border-top: solid 1px #eaeefb;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    &.is-fixed {
      position: fixed;
      bottom: 0;
      width: 868px;
    }

    .arrow-icon {
      display: inline-block;
      font-size: 28px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-55px);
      }
    }

    > span {
      position: absolute;
      display: inline-block;
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      transform: translateX(-30px);
    }

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }

    .control-button {
      position: absolute;
      top: 0;
      right: 0;
      padding-right: 25px;
      padding-left: 5px;
      font-size: 14px;
      line-height: 26px;
    }
  }
}
</style>
