import Utils from '../aria-utils'
import MenuItem from './aria-menuitem'

export default class SubMenu {
  subMenuItems: NodeListOf<HTMLLIElement> | Array<HTMLLIElement>

  private domNode: HTMLElement
  private parent: MenuItem
  private subIndex: number

  constructor(parent: MenuItem, domNode: HTMLElement) {
    this.domNode = domNode
    this.parent = parent
    this.subMenuItems = []
    this.subIndex = 0
    this.init()
  }

  init() {
    this.subMenuItems = this.domNode.querySelectorAll('li')
    this.addListeners()
  }

  gotoSubIndex(idx: number) {
    if (idx === this.subMenuItems.length) {
      idx = 0
    } else if (idx < 0) {
      idx = this.subMenuItems.length - 1
    }
    this.subMenuItems[idx].focus()
    this.subIndex = idx
  }

  addListeners() {
    const keys = Utils.keys
    const parentNode = this.parent.domNode
    Array.prototype.forEach.call(this.subMenuItems, (el: HTMLElement) => {
      el.addEventListener('keydown', event => {
        let prevDef = false
        switch (event.keyCode) {
          case keys.down:
            this.gotoSubIndex(this.subIndex + 1)
            prevDef = true
            break
          case keys.up:
            this.gotoSubIndex(this.subIndex - 1)
            prevDef = true
            break
          case keys.tab:
            Utils.triggerEvent(parentNode, 'mouseleave')
            break
          case keys.enter:
          case keys.space:
            prevDef = true
            event.currentTarget.click()
            break
        }
        if (prevDef) {
          event.preventDefault()
          event.stopPropagation()
        }
        return false
      })
    })
  }
}
