import MenuItem from './aria-menuitem'

export default class Menu {
  private domNode: HTMLElement;

  constructor(domNode: HTMLElement) {
    this.domNode = domNode
    this.init()
  }

  init() {
    let menuChildren = this.domNode.childNodes

    ;[].filter
      .call(menuChildren, (child: HTMLElement) => child.nodeType === 1)
      .forEach((child: HTMLElement) => {
        new MenuItem(child)
      })
  }
}