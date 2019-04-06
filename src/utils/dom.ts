import Vue from 'vue'

const isServer = Vue.prototype.$isServer
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

const trim = function(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

const camelCase = function(name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export const on = isServer ? () => {} : function(element: HTMLElement | Document, event: string, handler: EventListenerOrEventListenerObject) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

export const off = isServer ? () => {} : function(element: HTMLElement | Document, event: string, handler: EventListenerOrEventListenerObject) {
  if (element && event) {
    element.removeEventListener(event, handler, false)
  }
}

export const once = function(el: HTMLElement, event: string, fn: Function) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export function hasClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

export function addClass(el: HTMLElement, cls: string) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export function getStyle(element: HTMLElement, styleName: keyof CSSStyleDeclaration) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = <keyof CSSStyleDeclaration>camelCase(String(styleName))
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = (document.defaultView || window).getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

export function setStyle(element: HTMLElement, styleName: CSSStyleDeclaration | keyof CSSStyleDeclaration, value: number | string) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    
    for (const prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, <keyof CSSStyleDeclaration>prop, styleName[prop])
      }
    }
  } else {
    styleName = <keyof CSSStyleDeclaration>camelCase(String(styleName))
    if (styleName === 'length' || styleName === 'parentRule') return
    element.style[styleName] = value
  }
}
