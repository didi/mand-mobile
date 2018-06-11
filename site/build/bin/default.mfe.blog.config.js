const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  title: '',
  subtitle: '',
  logo: '',
  favicon: '',
  theme: 'default',
  hasHome: true,
  source: [],
  markdownBoundary: {
    '<!-- CUTOFF -->': '<div class="md-blog-cut-off"></div>',
  },
  output: resolve('public'),
  defaultTemplate: resolve('theme/default/DocTemplate.vue'),
  links: [],
  copyRight: '',
  produceBy: '',
  powerBy: '',
  routePrefix: '',
  staticPrefix: '',
}
