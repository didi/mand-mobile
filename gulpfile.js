'use strict'
const path = require('path')
const gulp = require('gulp')
const gulpBase64 = require('gulp-base64')
const preprocess = require('gulp-preprocess')
const babel = require('gulp-babel')
const gutil = require('gulp-util')
const compiler = require('vueify').compiler
const stylus = require('stylus')
const gulpStylus = require('gulp-stylus')
const through = require('through2')
const merge2 = require('merge2')
const colors = require('colors')
const pkg = require('./package.json')
const components = require('./examples/components.json')
// const execSync = require('child_process').execSync

colors.setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red',
  bold: 'bold'
})

const componentList = generateComponentsList(components)
const uncompliedComponentList = [...componentList]
const mixins = [
  path.join(__dirname, './components/_style/mixin/*.styl'),
  path.join(__dirname, './node_modules/nib/lib/nib/vendor'),
  path.join(__dirname, './node_modules/nib/lib/nib/gradients'),
  path.join(__dirname, './node_modules/nib/lib/nib/flex')
]

let succNum = 0
let failNum = 0

function generateComponentsList (components) {
  let list = []
  components.map(nav =>
    nav.list.map(item =>
      list.push(item.path.substr(1))
    )
  )
  return list
}

function compilingComponentLog () {
  return through.obj((file, encode, callback) => {
    if (file.path) {
      const res = file.content ? 0 : -1
      file.path.replace(/lib\/((\S)+)/ig, (s, v) => {
        if (!v) return
        if (res < 0) {
          succNum++
          console.log(`${pkg.name}/lib/${v} ✔`.info)
        } else {
          failNum++
          console.log(`${pkg.name}/lib/${v} ✘ (complie error)`.error)
        }
        uncompliedComponentList.splice(uncompliedComponentList.indexOf(v), 1)
      })
    }
    callback()
  })
}

function compileVueStylus (content, cb, compiler, filePath) {
  stylus(content)
    .import(mixins[0])
    .import(mixins[1])
    .import(mixins[2])
    .import(mixins[3])
    .render((err, css) => {
      if (err) throw err
      cb(null, css)
    })
}

function gulpVueify (options) {
  return through.obj(function (file, encode, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-vueify', 'Streams are not supported'))
      return callback()
    }
    if (options) {
      compiler.applyConfig(options)
    }
    const isExactCss = options.isExactCss
    let styleContent = ''
    const styleCb = res => {
      if (res.style) {
        styleContent = res.style
      }
    }
    if (isExactCss) {
      compiler.on('style', styleCb)
    }
    compiler.compile(file.contents.toString(), file.path, (err, result) => {
      if (err) {
        this.emit('error', new gutil.PluginError('gulp-vueify',
          `In file ${path.relative(process.cwd(), file.path)}:\n${err.message}`))
        return callback()
      }
      if (isExactCss) {
        // 仅提取css
        file.path = gutil.replaceExtension(file.path, '.css')
        file.contents = Buffer.from(styleContent)
        compiler.removeListener('style', styleCb)
      } else {
        // js & css 集成至一个文件
        file.path = gutil.replaceExtension(file.path, '.js')
        file.contents = Buffer.from(result)
      }
      callback(null, file)
    })
  })
}

gulp.task('compile', () => {
  const streamCompiledVue = gulp.src('./components/*/*.vue')
          .pipe(gulpVueify({
            extractCSS: true,
            customCompilers: {
              stylus: compileVueStylus
            }
          }))
          .pipe(gulp.dest('./lib'))
          .pipe(compilingComponentLog())

  const streamCompiledCss = gulp.src('./components/*/*.vue')
          .pipe(gulpVueify({
            isExactCss: true,
            customCompilers: {
              stylus: compileVueStylus
            }
          }))
          .pipe(gulpBase64())
          .pipe(gulp.dest('./lib/style'))
  
  const streamCompiledStylus = gulp.src('./components/_style/*.styl')
          .pipe(gulpStylus({
            compress: true,
            import: mixins
          }))
          .pipe(gulp.dest('./lib/style'))

  const streamCompiledJs = gulp.src('./components/**/!(test)/!(component).js')
          .pipe(preprocess({
            context: {
              'NODE_ENV': 'production',
              'MAN_VERSION': `'${pkg.version}' //`
            }}))
          .pipe(babel())
          .pipe(gulp.dest('./lib'))

  return merge2([streamCompiledVue, streamCompiledCss, streamCompiledStylus, streamCompiledJs])
})

gulp.task('build', ['compile'], () => {
  uncompliedComponentList.map(item => {
    failNum++
    console.log(`${pkg.name}/lib/${item} ✘ (not found)`.error)
  })
  console.log(
    `\n${pkg.name}(${pkg.version}) `.warn.bold +
    `build ${componentList.length} components : `.warn.bold +
    `${succNum} successed / ${failNum} failed\n`.warn.bold
  )
})
