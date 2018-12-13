const path = require('path')
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))
const { resultLog } = require('../utils')
const styleDir = path.resolve(__dirname, '../../components/_style/mixin')
const outputLibDir = path.resolve(__dirname, '../../lib')
const outputLibVwDir = path.resolve(__dirname, '../../lib-vw')

function getFile(filename) {
  const fileDir = path.resolve(styleDir, filename)
  const fileContent = fs.readFileSync(fileDir, {
    encoding: 'utf8'
  })
  return fileContent
}

function clearComment(content) {
  content = content.replace(/\/\*{1,2}[\s\S]*?\*\//g, '')
  content = content.replace(/\/\/[\s\S]*?\n/g, '\n')
  content = content.replace(/\n/g, '|')
  return content
}

function matchContent(content, obj) {
  const reg = /([\w-]*)\s*=\s*([\w\s#\-,()."\u4e00-\u9fa5]*)/g
  const result = reg.exec(content)
  if (!result) {
    return obj
  }

  const [matched, key, value] = result
  const tmp = obj || {}
  tmp[key] = value.trim()
  content = content.replace(matched, '')

  return matchContent(content, tmp)
}

function getStyleJson(filename) {
  let content = getFile(filename)
  content = clearComment(content)
  return matchContent(content)
}

const files = ['theme.basic.styl', 'theme.components.styl']

try {
  files.forEach(file => {
    const content = getStyleJson(file)
    const fileLibDir = path.resolve(outputLibDir, file.replace('styl', 'json'))
    fs.createWriteStream(fileLibDir).write(JSON.stringify(content))
  
    const fileLibVwDir = path.resolve(outputLibVwDir, file.replace('styl', 'json'))
    fs.createWriteStream(fileLibVwDir).write(JSON.stringify(content))
  })
  resultLog('success', 'Build **Css Variables** Complete!')
} catch (error) {
  console.info(error)
  resultLog('error', 'Build **Css Variables** Fail!')
}
