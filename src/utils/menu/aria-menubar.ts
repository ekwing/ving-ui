import MenuItem from './aria-menuitem'

export default class Menu {
  private domNode: Element;

  constructor(domNode: Element) {
    this.domNode = domNode
    this.init()
  }

  init() {
    let menuChildren = this.domNode.childNodes

    ;[].filter
      .call(menuChildren, (child: Element) => child.nodeType === 1)
      .forEach((child: Element) => {
        new MenuItem(child); // eslint-disable-line
      })
  }
}