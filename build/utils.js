const chalk = require('chalk')

exports.resultLog = function (type = 'success', msg = '') {
  const color = type === 'success' ? 'greenBright' : 'redBright'
  const bgColor = type === 'success' ? 'bgGreenBright' : 'bgRedBright'
  const output = msg.split('**').reduce((value, part, index) => {
    if (index % 2 === 1) {
      return value += chalk[color].bold.underline(part)
    } else {
      return value += chalk[color](part)
    }
  }, '')
  console.log(
    '\n'
    + chalk[bgColor].bold(` ${type.toUpperCase()} `)
    + ' '
    + output
    + '\n'
  )
} 