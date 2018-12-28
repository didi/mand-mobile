const colors = require('colors')
const chalk = require('chalk')
const defaultMbConfig = require('./default.mfe.blog.config')
const NOOP = () => {}
// Mfe template blog config info
const mbConfig = Object.assign(defaultMbConfig, require('../../mfe.blog.config'))

colors.setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red',
  bold: 'bold',
})

function stdout(title, msg) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`${chalk.yellow.bold(title)} ${msg}`)
}

function log(msg) {
  if (process.argv.indexOf('--log') >= 0) {
    console.log(msg)
  }
}

function info(msg) {
  log('[DOC SITE INFO]'.info.bold + ` ${msg}`)
}

function warn(msg) {
  log('[DOC SITE WARN]'.warn.bold + ` ${msg}`)
}

function error(msg) {
  log('[DOC SITE ERROR]'.error.bold + ` ${msg}`)
}

// Traverse "source" and do sth with each item
function traverseSource(source, fn = NOOP, path = [], level = 0) {
  for (let i = 0, len = source.length; i < len; i++) {
    const item = source[i]
    path[level] = item.name

    if (item.menu && Array.isArray(item.menu)) {
      const tmpPath = [...path]
      level++
      traverseSource(item.menu, fn, path, level)
      path = [...tmpPath]
      level--
    }

    const res = fn(item, path)

    if (res === 1) {
      continue
    } else if (res === 2) {
      break
    }
  }
}

// Transform kebab-case to camelCase
function kebabToCamel (str) {
  const parts = str.split('-')
  let newStr = ''

  for (let i = 0, len = parts.length; i < len; i++) {
    const part = parts[i]
    if (!part) {
      continue
    }
    newStr += part[0].toLocaleUpperCase() + part.substr(1)
  }

  return newStr
}

function sleep (time = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

module.exports = {mbConfig, traverseSource, kebabToCamel, info, warn, error, stdout, sleep}
