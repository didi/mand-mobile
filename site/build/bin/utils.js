const colors = require('colors')
const defaultMbConfig = require('./default.mfe.blog.config')

// Mfe template blog config info
const mbConfig = Object.assign(defaultMbConfig, require('../../mfe.blog.config'))

colors.setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red',
  bold: 'bold',
})

function log(msg) {
  if (process.argv.indexOf('--log') >= 0) {
    console.log(msg)
  }
}

function info(msg) {
  log('[MTB INFO]'.info.bold + ` ${msg}`)
}

function warn(msg) {
  log('[MTB WARN]'.warn.bold + ` ${msg}`)
}

function error(msg) {
  log('[MTB ERROR]'.error.bold + ` ${msg}`)
}

// Traverse "source" and do sth with each item
function traverseSource(source, fn, path = [], level = 0) {
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

    fn && fn(item, path)
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

module.exports = {mbConfig, traverseSource, kebabToCamel, info, warn, error}
