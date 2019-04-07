import Vue from 'vue'

declare global {
  interface HTMLElement {
    '@@clickoutsideContext': {
      documentHandler: (e: Event) => void,
      methodName: string,
      arg: string
    }
  }
}
