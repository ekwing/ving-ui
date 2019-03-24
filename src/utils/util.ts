import Vue from 'vue'

const hasOwnProperty = Object.prototype.hasOwnProperty

export function noop() {}

export function hasOwn(obj: any, key: string) {
  return hasOwnProperty.call(obj, key)
}

function extend(to: any, _from: any) {
  for (let key in _from) {
    to[key] = _from[key]
  }
  return to
}

export function toObject(arr: any[]) {
  var res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export const getValueByPath = function(object: any, prop: string) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

export function getPropByPath(obj: any, path: any, strict: boolean) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  let keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

export const generateId = function() {
  return Math.floor(Math.random() * 10000)
}

export const valueEquals = (a: any, b: any) => {
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

export const arrayFindIndex = function(arr: any[], pred: Function) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i
    }
  }
  return -1
}

export const arrayFind = function(arr: any[], pred: Function) {
  const idx = arrayFindIndex(arr, pred)
  return idx !== -1 ? arr[idx] : undefined
}

export const coerceTruthyValueToArray = function(val: any) {
  if (Array.isArray(val)) {
    return val
  } else if (val) {
    return [val]
  } else {
    return []
  }
}
