import { VNode } from 'vue'
import { hasOwn } from 'ving-ui/src/utils/util'

export function isVNode(node: any) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
}

export function getFirstComponentChild(children: VNode[] | undefined) {
  return children && children.filter(c => c && c.tag)[0]
}
