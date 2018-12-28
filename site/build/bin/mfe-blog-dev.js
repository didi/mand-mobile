const path = require('path')
const nodemon = require('nodemon')
const {mbConfig, traverseSource} = require('./utils')

/**
 * Get path of files which should be monitored by nodemon
 */
function getWatchPath() {
  const watchList = [path.join(__dirname, '../..', 'mfe.blog.config.js')]

  function handlerSingleSource(item) {
    const markdownPath = item.markdown
    const templatePath = item.template || mbConfig.defaultTemplate
    const demoPath = item.demo

    markdownPath && watchList.push(markdownPath)
    templatePath && watchList.push(templatePath)
    demoPath && watchList.push(demoPath)
  }

  traverseSource(mbConfig.source, handlerSingleSource)

  return watchList
}

/**
 * Start Parsing
 */
function startDev() {
  let timmer
  nodemon({
    script: path.join(__dirname, 'mfe-blog-generate.js'),
    restartable: false,
    ext: 'js vue md css styl',
    stdout: true,
    required: true,
    watch: getWatchPath(),
    ignore: ['public/*', 'build/*', 'node_modules/*']
  }).on('quit', function() {
    process.exit()
  })
  // .on('restart', function(file) {
  // })
}

startDev()
