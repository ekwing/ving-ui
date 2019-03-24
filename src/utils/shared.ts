export const isDef = (val: any) => val !== undefined && val !== null

export const isKorean = (text: string) => {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
  return reg.test(text)
}
