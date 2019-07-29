const cnNums = ['\u96f6', '\u58f9', '\u8d30', '\u53c1', '\u8086', '\u4f0d', '\u9646', '\u67d2', '\u634c', '\u7396']

// 拾 \u62fe 佰 \u4f70 仟 \u4edf
const cnIntRadice = ['', '\u62fe', '\u4f70', '\u4edf']

// 万 \u4e07 亿 \u4ebf 兆 \u5146
const cnIntUnits = ['', '\u4e07', '\u4ebf', '兆']

// 角 \u89d2 分 \u5206 毫 \u6beb 厘 \u5398
const cnDecUnits = ['\u89d2', '\u5206', '\u6beb', '\u5398']
const cnInteger = '\u6574' // 整 \u6574
const cnIntLast = '\u5143' // 元 \u5143

const cnNegative = '\u8d1f' // 负

// Maximum number
const maxNum = 999999999999999.9999

export default function(number) {
  let negative
  // Integral part
  let integerNum
  // Decimal part
  let decimalNum
  // Capital number
  let capitalStr = ''

  let parts

  /* istanbul ignore if  */
  if (number === '') {
    return ''
  }

  number = parseFloat(number)

  if (number < 0) {
    negative = true
    number = Math.abs(number)
  }

  /* istanbul ignore if  */
  if (number >= maxNum) {
    return ''
  }

  /* istanbul ignore if  */
  if (number === 0) {
    capitalStr = cnNums[0] + cnIntLast + cnInteger
    return capitalStr
  }

  // Convert to String
  number += ''

  if (number.indexOf('.') === -1) {
    integerNum = number
    decimalNum = ''
  } else {
    parts = number.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }

  // Convert integer part
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    for (let i = 0, IntLen = integerNum.length; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          capitalStr += cnNums[0]
        }
        zeroCount = 0
        capitalStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        capitalStr += cnIntUnits[q]
      }
    }
    capitalStr += cnIntLast
  }

  // Convert decimal part
  if (decimalNum !== '') {
    for (let i = 0, decLen = decimalNum.length; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        capitalStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }

  /* istanbul ignore if  */
  if (capitalStr === '') {
    capitalStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    capitalStr += cnInteger
  }

  if (negative) {
    capitalStr = `${cnNegative}${capitalStr}`
  }
  return capitalStr
}
