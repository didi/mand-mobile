
/**
 * Build style entry of all components
 */

const fs = require('fs-extra')
const path = require('path')
const components = require('../../examples/components.json')
const dependencyTree = require('dependency-tree')
const libDir = path.resolve(__dirname, '../../lib')

const SEP = path.sep

function generateComponentsList (components) {
  const list = ['field-item', 'swiper-item', 'popup-title-bar']
  components.map(nav =>
    nav.list.map(item =>
      list.push(item.path.substr(1))
    )
  )
  return list
}

const componentList = generateComponentsList(components)
function checkComponentHasStyle(componentName) {
  if (~componentName.indexOf('.js')) {
    componentName = componentName.replace('.js', '.css')
    return fs.existsSync(path.join(__dirname, `../lib/style/${componentName}`))
  } else {
    return fs.existsSync(path.join(__dirname, `../lib/style/${componentName}/index.css`))
  }
}

function search(tree, checkList) {
  tree && Object.keys(tree).forEach(key => {
    search(tree[key], checkList)
    const component = key.split(`${SEP}mand-mobile${SEP}lib${SEP}`)[1].replace(`${SEP}index.js`, '').replace(`mixins${SEP}`, '')
    if (checkList.indexOf(component) === -1) {
      checkList.push(component)
    }
  })
}

// Analyze component dependencies
function analyzeDependencies(componentName, libDir) {
  const checkList = []
  search(dependencyTree({
    directory: libDir,
    filename: path.resolve(libDir, componentName, 'index.js'),
    filter: path => path.indexOf(`mand-mobile${SEP}lib${SEP}`) !== -1
  }), checkList)
  return checkList.filter(component => checkComponentHasStyle(component))
}

componentList.forEach(componentName => {
  const content = analyzeDependencies(componentName, libDir).map(component => {
    if (~component.indexOf('.js')) {
      component = component.replace('.js', '.css')
      return `require('../../style/${component}')`
    } else {
      return `require('../../style/${component}/index.css')`
    }
  })
  content.unshift('require(\'../../style/global.css\')')
  fs.outputFileSync(path.join(libDir, componentName, './style/index.js'), content.join('\n'))
})

