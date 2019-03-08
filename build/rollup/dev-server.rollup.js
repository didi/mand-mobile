const rollup = require('rollup')
const path = require('path')
const { rollupPluginFactory, DEV_OUTPUT_DIR, PROJECT_DIR } = require('./rollup-plugin-config')
const { resultLog } = require('../utils')


// express
const livereload = require('livereload')
const express = require('express')
const history = require('connect-history-api-fallback')
// const opn = require('opn')
const port = 4000

const inputOptionsFactory = async ()  => ({
  input: path.resolve(PROJECT_DIR, 'examples/main.js'),
  plugins: await rollupPluginFactory(),
  onwarn (warning) {
    // throw on others
    if (warning.code === 'NON_EXISTENT_EXPORT') {
      throw new Error(warning.message)
    }
  }
})

const outputCommonjsOptions = {
  file: path.resolve(DEV_OUTPUT_DIR, 'mand-mobile-dev.js'),
  format: 'umd',
}

async function watch() {
  const watchOptions = Object.assign(await inputOptionsFactory(), {
    output: outputCommonjsOptions,
  })
  const watcher = rollup.watch(watchOptions)
  watcher.on('event', e => {
    if (e.code === 'END') {
      resultLog('success', 'Dev Server Ready!')
    }
    if (e.code === 'ERROR' || e.code === 'FATAL') {
      console.log('\n')
      resultLog('error', e.error.stack)
    }
  })
}


function serve(path) {
  return express.static(path, {})
}

async function runServer() {
  // rollup buildwatch
  await watch()
  
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