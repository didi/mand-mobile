// http://www.t086.com/article/4315
export const keyCodeList = {
  bankCard: ['8', '13', '48-57', '96-105', '108', '229'],
  phone: ['8', '13', '48-57', '96-105', '108', '229'],
  money: ['8', '13', '48-57', '96-105', '108', '110', '190', '229'],
}

export function isValidKey(type, code) {
  const list = keyCodeList[type] || ''

  if (!list) {
    return true
  }

  let res = false

  for (let i = 0, len = list.length; i < len; i++) {
    const itemParts = list[i].split('-')
    const min = +itemParts[0]
    const max = +itemParts[1] || null

    if (max === null && code === min) {
      res = true
      break
    } else if (max !== null && code >= min && code <= max) {
      res = true
      break
    }
  }

  return res
}
