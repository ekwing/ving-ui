import { DirectiveBinding } from 'vue/types/options'
import { VueConstructor, DirectiveOptions, VNode, PluginObject } from 'vue'

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
const clickoutsideContext = '@@clickoutsideContext'

const clickoutside: DirectiveOptions & PluginObject<any> = {
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const documentHandler = function(e: Event) {
      if (vnode.context && !el.contains(<Node>e.target)) {
        vnode.context[el[clickoutsideContext].methodName]()
      }
    }
    el[clickoutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      arg: binding.arg || 'click'
    }
    document.addEventListener(el[clickoutsideContext].arg, documentHandler)
  },

  update(el: HTMLElement, binding: DirectiveBinding) {
    el[clickoutsideContext].methodName = binding.expression
  },

  unbind(el: HTMLElement) {
    document.removeEventListener(
      el[clickoutsideContext].arg,
      el[clickoutsideContext].documentHandler)
  },

  install(Vue: VueConstructor) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}

export default clickoutside