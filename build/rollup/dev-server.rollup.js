const rollup = require('rollup')
const path = require('path')
const { rollupPlugin, DEV_OUTPUT_DIR, PROJECT_DIR } = require('./rollup-plugin-config')


// express
const livereload = require('livereload')
const express = require('express')
const history = require('connect-history-api-fallback')
// const opn = require('opn')
const port = 4000

const inputOptions = {
  input: path.resolve(PROJECT_DIR, 'examples/main.indemand.js'),
  plugins: rollupPlugin,
}

const outputCommonjsOptions = {
  file: path.resolve(DEV_OUTPUT_DIR, 'mand-mobile-dev.js'),
  format: 'umd',
}

function watch() {
  const watchOptions = Object.assign(inputOptions, {
    output: outputCommonjsOptions,
  })
  const watcher = rollup.watch(watchOptions)
  watcher.on('event', e => {
    console.info(e)
    if (e.code === 'END') {
      console.info('resource rebuild')
    }
    if (e.code === 'ERROR') {
      console.info(e)
    }
  })
}


function serve(path) {
  return express.static(path, {})
}

function runServer() {
  // rollup buildwatch
  watch()
  
  // livereload
  const lrserver = livereload.createServer()
  lrserver.watch(path.join(process.cwd(), 'output'))

  // static resource server
  const app = express()
  app.use(history({
    verbose: true
  }))
  app.use('/', serve(DEV_OUTPUT_DIR))
  app.listen(port, function() {
    console.log('> Starting dev server...')
  })
}


runServer()