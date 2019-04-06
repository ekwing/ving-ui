import { PluginFunction } from 'vue'

declare const VingUI: VingUI
export default VingUI
export interface VingUI {
  install: PluginFunction<any>
  version: string
}

declare global {
  interface HTMLElement {
    '@@clickoutsideContext': {
      documentHandler: (e: Event) => void,
      methodName: string,
      arg: string
    }
  }
}
