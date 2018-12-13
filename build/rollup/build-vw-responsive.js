const glob = require('glob')
const copy = require('recursive-copy')
const postcss = require('postcss')
const px2vw = require('postcss-pixel-to-viewport')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const TARGET_LIB_BASE = 'lib'
const TARGET_VW_LIB_BASE = 'lib-vw'



function copyLib() {
  return new Promise((res, reject) => {
    fs.stat(path.resolve(__dirname, '../../', TARGET_LIB_BASE), (err) => {
      if (err) {
        reject(err)
      }
      res()
    })
  })
    .then(() => {
      return copy(TARGET_LIB_BASE, TARGET_VW_LIB_BASE)
    })
}


function compilePxToVw(filePath){
  const cssContent = fs.readFileSync(filePath, {
    encoding: 'utf8',
  })

  postcss([px2vw({
    viewportUnit: 'vw',
    minPixelValue: 2,
  })])
  .process(cssContent)
  .then(result => {
    return fs.writeFileSync(filePath, result, {
      encoding: 'utf8',
    })
  })
  .catch(e => console.info(e))
}


function compilePxToVwAll() {
  const fileGlob = `${TARGET_VW_LIB_BASE}/**/*.css`
  const cssFiles = glob.sync(fileGlob)
  return Promise.all(cssFiles.map(compilePxToVw))
  .catch(e => {
    console.info(e)
  })
}

function main() {
  copyLib()
  .then(compilePxToVwAll)
  .then(() => {
    console.log('\n' + chalk.green.bold('BUILD ') + chalk.bgYellow.bold('VM/VW') + chalk.green.bold(' SUCCESS'))
  })
  .catch(err => {
    console.info(err)
    console.log('\n' + chalk.red.bold('BUILD ') + chalk.bgRed.bold('VM/VW') + chalk.red.bold(' FAIL'))
  })
}

main()