import * as utils from './aria-utils'

class Dialog {
  private dialogNode: HTMLElement
  private focusAfterClosed: any
  private focusFirst: any
  private lastFocus: HTMLElement | null

  constructor(dialog: HTMLElement, focusAfterClosed: any, focusFirst: any) {
    this.dialogNode = dialog
    if (this.dialogNode === null || this.dialogNode.getAttribute('role') !== 'dialog') {
      throw new Error('Dialog() requires a DOM element with ARIA role of dialog.')
    }
  
    if (typeof focusAfterClosed === 'string') {
      this.focusAfterClosed = document.getElementById(focusAfterClosed)
    } else if (typeof focusAfterClosed === 'object') {
      this.focusAfterClosed = focusAfterClosed
    } else {
      this.focusAfterClosed = null
    }
  
    if (typeof focusFirst === 'string') {
      this.focusFirst = document.getElementById(focusFirst)
    } else if (typeof focusFirst === 'object') {
      this.focusFirst = focusFirst
    } else {
      this.focusFirst = null
    }
  
    if (this.focusFirst) {
      this.focusFirst.focus()
    } else {
      utils.focusFirstDescendant(this.dialogNode)
    }
  
    this.lastFocus = document.activeElement

    this.addListeners()
  }

  addListeners() {
    document.addEventListener('focus', this.trapFocus.bind(this), true)
  }

  removeListeners() {
    document.removeEventListener('focus', this.trapFocus.bind(this), true)
  }

  closeDialog() {
    this.removeListeners()
    if (this.focusAfterClosed) {
      setTimeout(() => {
        this.focusAfterClosed.focus()
      })
    }
  }

  trapFocus(event: Event) {
    if (utils.IgnoreUtilFocusChanges) {
      return
    }
    if (this.dialogNode.contains(event.target)) {
      this.lastFocus = event.target
    } else {
      utils.focusFirstDescendant(this.dialogNode)
      if (this.lastFocus === document.activeElement) {
        utils.focusLastDescendant(this.dialogNode)
      }
      this.lastFocus = document.activeElement
    }
  }
}

export default Dialog