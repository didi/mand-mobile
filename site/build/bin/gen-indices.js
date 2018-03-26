const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')
const key = require('./algolia-key')

const client = algoliasearch('4GDUUWIAWB', key)

const index = client.initIndex('mand')

index.clearIndex(err => {
  if (err) {
    return
  }

  generateIndices('../../docs')

  fs.readdir(path.resolve(__dirname, '../../../components'), (err, dirs) => {
    if (err) {
      console.log(err)
      return
    }

    dirs.forEach(dir => {
      if (dir.indexOf('.') < 0) {
        generateIndices(`../../../components/${ dir }`, dir)
      }
    })
  })
})

function generateIndices(filePath, component) {
  fs.readdir(path.resolve(__dirname, filePath), (err, files) => {
    if (err) {
      console.log(err)
      return
    }

    let indices = []
    files.forEach(file => {
      if (file.indexOf('.md') < 0) {
        return
      }

      const content = fs.readFileSync(path.resolve(__dirname, `${ filePath }/${ file }`), 'utf8')

      if (content.indexOf('##') < 0) {
        return
      }

      const matches = content
        .replace(/:::[\s\S]*?:::/g, '')
        .replace(/```[\s\S]*?```/g, '')
        .match(/#{2,5}[^#]*/g)
        .map(match => match.replace(/\n+/g, '\n').split('\n').filter(part => !!part))
        .map(match => {
          const length = match.length
          if (length > 2) {
            const desc = match.slice(1, length).join('')
            return [match[0], desc]
          }
          return match
        })

      indices = indices.concat(matches.map(match => {
        const isComponent = match[0].indexOf('###') < 0
        const title = match[0].replace(/#{2,5}/, '').trim()
        let index

        index = {
          component: component || file.replace('.md', ''),
          title,
        }

        index.ranking = isComponent ? 2 : 1
        index.content = (match[1] || title).replace(/<[^>]+>/g, '')
        return index
      }))
    })

    index.addObjects(indices, (err, res) => {
      console.log(err, res)
    })
  })
}