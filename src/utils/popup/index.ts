import { Component, Vue, Prop } from 'vue-property-decorator'
import merge from '@/utils/merge'
import PopupManager from '@/utils/popup/popup-manager'

import { addClass, getStyle, hasClass, removeClass } from '../dom'
import getScrollBarWidth from '../scrollbar-width'

let idSeed = 1

let scrollBarWidth

@Component
export default class PopupComponent extends Vue {
  @Prop({ default: false })
  private visible!: boolean

  @Prop()
  private openDelay!: object

  @Prop()
  private closeDelay!: object

  @Prop()
  private zIndex!: object

  @Prop({ default: false })
  private modal!: boolean

  @Prop({ default: false })
  private modalFade!: boolean

  @Prop({ default: false })
  private modalAppendToBody!: boolean

  @Prop({ default: true })
  private lockScroll!: boolean

  @Prop({ default: false })
  private closeOnPressEscape!: boolean

  @Prop({ default: false })
  private closeOnClickModal!: boolean

  private opened = false
  private bodyPaddingRight: string | null = null
  private computedBodyPaddingRight: number = 0
  private withoutHiddenClass = true
  private rendered = false

  private _popupId!: string
  private _openTimer: number | undefined
  private _closeTimer: number | undefined
  private _opening!: boolean
  private _closing!: boolean

  beforeMount() {
    this._popupId = 'popup-' + idSeed++
    PopupManager.register(this._popupId, this)
  }

  beforeDestroy() {
    PopupManager.deregister(this._popupId)
    PopupManager.closeModal(this._popupId)

    this.restoreBodyStyle()
  }

  // watch: {
  //   visible(val) {
  //     if (val) {
  //       if (this._opening) return
  //       if (!this.rendered) {
  //         this.rendered = true
  //         Vue.nextTick(() => {
  //           this.open()
  //         })
  //       } else {
  //         this.open()
  //       }
  //     } else {
  //       this.close()
  //     }
  //   }
  // }

  open(options) {
    if (!this.rendered) {
      this.rendered = true
    }

    const props = merge({}, this.$props || this, options)

    if (this._closeTimer) {
      clearTimeout(this._closeTimer)
      this._closeTimer = undefined
    }
    clearTimeout(this._openTimer)

    const openDelay = Number(props.openDelay)
    if (openDelay > 0) {
      this._openTimer = setTimeout(() => {
        this._openTimer = undefined
        this.doOpen(props)
      }, openDelay)
    } else {
      this.doOpen(props)
    }
  }

  doOpen(props) {
    if (this.$isServer) return
    if (this.willOpen && !this.willOpen()) return
    if (this.opened) return

    this._opening = true

    const dom = this.$el

    const modal = props.modal

    const zIndex = props.zIndex
    if (zIndex) {
      PopupManager.zIndex = zIndex
    }

    if (modal) {
      if (this._closing) {
        PopupManager.closeModal(this._popupId)
        this._closing = false
      }
      PopupManager.openModal(
        this._popupId,
        PopupManager.nextZIndex(),
        this.modalAppendToBody ? undefined : dom,
        props.modalClass,
        props.modalFade
      )
      if (props.lockScroll) {
        this.withoutHiddenClass = !hasClass(document.body, 'el-popup-parent--hidden')
        if (this.withoutHiddenClass) {
          this.bodyPaddingRight = document.body.style.paddingRight
          this.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10)
        }
        scrollBarWidth = getScrollBarWidth()
        let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight
        let bodyOverflowY = getStyle(document.body, 'overflowY')
        if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
          document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px'
        }
        addClass(document.body, 'el-popup-parent--hidden')
      }
    }

    if (getComputedStyle(dom).position === 'static') {
      dom.style.position = 'absolute'
    }

    dom.style.zIndex = PopupManager.nextZIndex()
    this.opened = true

    this.onOpen && this.onOpen()

    this.doAfterOpen()
  }

  doAfterOpen() {
    this._opening = false
  }

  close() {
    if (this.willClose && !this.willClose()) return

    if (this._openTimer !== null) {
      clearTimeout(this._openTimer)
      this._openTimer = undefined
    }
    clearTimeout(this._closeTimer)

    const closeDelay = Number(this.closeDelay)

    if (closeDelay > 0) {
      this._closeTimer = setTimeout(() => {
        this._closeTimer = undefined
        this.doClose()
      }, closeDelay)
    } else {
      this.doClose()
    }
  }

  doClose() {
    this._closing = true

    this.onClose && this.onClose()

    if (this.lockScroll) {
      setTimeout(this.restoreBodyStyle, 200)
    }

    this.opened = false

    this.doAfterClose()
  }

  doAfterClose() {
    PopupManager.closeModal(this._popupId)
    this._closing = false
  }

  restoreBodyStyle() {
    if (this.modal && this.withoutHiddenClass) {
      document.body.style.paddingRight = this.bodyPaddingRight
      removeClass(document.body, 'el-popup-parent--hidden')
    }
    this.withoutHiddenClass = true
  }
}

export { PopupManager }
