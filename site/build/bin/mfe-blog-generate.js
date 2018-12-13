const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const highlight = require('./markdown').highlight
const markdown = require('./markdown').markdown
const {mbConfig, traverseSource, kebabToCamel, info, warn, error, stdout} = require('./utils')

let views, routes

function resolve(dir) {
  return path.join(__dirname, '../../../', dir)
}
/**
 * Transform markdown to html fragment &&
 * Generate entry(index.data.js) of markdown data
 * @param {string} markdownPath
 * @param {string} outputPath
 */
function generateSourceData(markdownPath, outputPath) {
  let markDownContent = ''

  if (fs.existsSync(markdownPath)) {
    markDownContent = fs.readFileSync(markdownPath).toString()
    markDownContent = parseBoundarySymbolic(markDownContent)
    markDownContent = makeJavascriptModule({}, markdown(markDownContent))
  } else {
    error(`markdown is not exist : ${markdownPath}`)
  }

  fs.writeFileSync(`${outputPath}/index.data.js`, markDownContent)
}

/**
 * Generate entry(index.demo.js) of Demo
 * @param {string} markdownPath
 * @param {string} outputPath
 */
function generateDemoVue(outputPath, demoPath = []) {
  const imports = {}
  const exports = []

  for (let index = 0, len = demoPath.length; index < len; index++) {
    const demo = demoPath[index]
    const demoName = `demo${index}`
    const demoFileName = `${demoName}.vue`

    if (!fs.existsSync(demo)) {
      error(`demo is not exist : ${demo}`)
      continue
    }

    const demoContent = fs.readFileSync(demo).toString()
    const demoContentRaw = deleteDevCodeOfDemo(demoContent)
    imports[demoName] = `./${demoFileName}`
    exports[index] = `{ component: ${demoName}, code: ${JSON.stringify(highlight(demoContentRaw))}, raw: "${encodeURI(demoContent)}" }`

    fs.writeFileSync(`${outputPath}/${demoFileName}`, demoContent)
  }

  fs.writeFileSync( `${outputPath}/index.demo.js`, makeJavascriptModule(imports, { demos: `[${exports.join(',')}]`, }))
}

/**
 * Generate entry(index.vue) of Doc
 * @param {string} templatePath doc template
 * @param {string} outputPath
 */
function generateDocVue(templatePath, outputPath) {
  templatePath = templatePath || mbConfig.defaultTemplate

  let template = ''

  if (fs.existsSync(templatePath)) {
    template = fs.readFileSync(templatePath).toString()
  } else {
    error(`template is not exist : ${templatePath}`)
  }

  fs.writeFileSync(`${outputPath}/index.vue`, template)
}

function generateConfig(config) {
  const reg = new RegExp(resolve(''), 'ig')
  fs.writeFileSync( `${config.output}/config.js`, `window.mbConfig=${JSON.stringify(config)}`.replace(reg, ''))
}

/**
 * Generate routes enttry(route.js) of Doc
 * @param {string} outputPath
 */
function generateRoutepath(outputPath) {
  fs.writeFileSync( `${outputPath}/route.js`, views.join('') + makeJavascriptModule( {}, { default: `[${routes.join(',')}]`}))
}

/**
 * Generate code for Import Doc vue  & Export Doc Route
 * @param {object} source
 * @param {string} routePath
 * @param {array} views
 * @param {array} routes
 */
function saveRoutepath(source, routePath, views, routes) {
  const name = kebabToCamel(routePath.replace(/\//g, '-'))
  const text = source.text
  const src = source.src
  const entryPath = `${mbConfig.output}${routePath}/index.vue`
  const meta = `meta: { text: '${text}', src: '${src || ''}', markdown: '${!!source.markdown || ''}'}`

  let view, route

  if (fs.existsSync(entryPath)) {
    view = `const ${name} = r => require.ensure([], () => r(require('.${routePath}')), '${name}');\n`
    views.push(view)
    route = `{ path: '${routePath}', component: ${name}, ${meta} }`
  } else {
    if (src && (src.indexOf('//') < 0)) {
      route = `{ path: '${routePath}', redirect: '${src}', ${meta} }`
    } else {
      route = `{ path: '${routePath}', ${meta} }`
    }
  }
  routes.push(route)
}

/**
 * Parse boundary symbolic in marddown content
 * @param {string} content
 * @return {string} content
 */
function parseBoundarySymbolic(content) {
  const boundary = mbConfig.markdownBoundary
  for (const key in boundary) {
    if (boundary.hasOwnProperty(key)) {
      content = content.replace(key, boundary[key])
    }
  }
  return content
}

/**
 * Remove development code of demo divided by '\/\* DELETE \*\/'
 * @param {string} content
 * @return {string} content
 */
function deleteDevCodeOfDemo(content) {
  const parts = content.split(/\/\* DELETE \*\/\n\s\s/)
  let newContent = ''
  for (let i = 0, len = parts.length; i < len; i++) {
    if (i % 2 === 0) {
      newContent += parts[i] || ''
    }
  }
  
  return newContent || content
}

/**
 * Generate Js Module
 * @param {object} imports
 * @param {object} exports
 * @return {string} code
 */
function makeJavascriptModule(imports = {}, exports = {}) {
  let content = ''

  for (const key in imports) {
    if (imports.hasOwnProperty(key)) {
      // import [key] from [conent]
      content += `import ${key} from ${JSON.stringify(imports[key])};\n`
    }
  }

  for (const key in exports) {
    if (exports.hasOwnProperty(key)) {
      const singleExport = typeof exports[key] === 'string' ? exports[key] : JSON.stringify(exports[key])
      // export default [conent] or export const [key] = [conent]
      content += key === 'default' ? `export default ${singleExport};\n` : `export const ${key} = ${singleExport};\n`
    }
  }

  return content
}

function startGenerate() {
  const source = mbConfig.source
  const startTmp = Date.now()

  let count = 0

  views = []
  routes = []

  info('Start processing\n')

  if (!source || !source.length) {
    warn('No source found!')
    end()
    return
  }

  function end() {
    const endTmp = Date.now()
    console.log('\n')
    info(`Parse completed! Files loaded in ${(endTmp - startTmp) / 1000}s\n`)
  }

  function handlerSingleSource(item, path) {
    const markdownPath = item.markdown
    const templatePath = item.template
    const demoPath = item.demo
    const outputPath = `${mbConfig.output}/${path.join('/')}`

    mkdirp.sync(outputPath)

    if (markdownPath) {
      generateSourceData(markdownPath, outputPath)
      generateDemoVue(outputPath, demoPath)
      generateDocVue(templatePath, outputPath)

      count++

      stdout(
        `(${parseInt(count)})`,
        markdownPath
      )
    }
    saveRoutepath(item, `/${path.join('/')}`, views, routes)
  }

  traverseSource(source, handlerSingleSource)

  generateRoutepath(mbConfig.output)
  generateConfig(mbConfig)
  end()
}

// bootstrap
startGenerate()
