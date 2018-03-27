const fs = require('fs')
const path = require('path')
const components = require('../examples/components.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function generateDemos (name) {
  const demoPath = resolve(`components/${name}/demo/cases`)

  if (fs.existsSync(demoPath)) {
    const files = fs.readdirSync(demoPath)
    return files.map(file => {
      return `${demoPath}/${file}`
    })
  } else {
    return []
  }
}

function generateSource () {
  const menus = []
  components.forEach(category => {
    const list = category.list
    const subMenus = []

    list && list.forEach(component => {
      subMenus.push({
        name: component.path.substr(1),
        text: `${component.name} <span>${component.text}</span>`,
        markdown: resolve(`components${component.path}/README.md`),
        demo: generateDemos(component.path.substr(1))
      })
    })
    menus.push({
      name: category.category,
      text: category.name,
      menu: subMenus
    })
  })

  return menus
}

module.exports = {
  title: 'Mand Mobile',
  subtitle: 'Manhattan Design Mobile',
  logo: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg',
  favicon: '//static.galileo.xiaojukeji.com/static/tms/other/mand-mobile-logo.png',
  source: [
    {
      name: 'design',
      text: '设计',
      src: '/design/resource',
      menu: [
        {
          name: 'resource',
          text: '设计资源',
          markdown: resolve('site/docs/resource.md'),
        }
      ]
    },
    {
      name: 'docs',
      text: '组件',
      src: '/docs/introduce',
      menu: [
        {
          name: 'introduce',
          text: 'Mand Mobile',
          markdown: resolve('site/docs/introduce.md'),
        },
        {
          name: 'started',
          text: '快速上手',
          markdown: resolve('site/docs/started.md'),
        },
        {
          name: 'development',
          text: '开发指南',
          markdown: resolve('site/docs/development.md'),
        },
        {
          name: 'changelog',
          text: '更新日志',
          markdown: resolve('CHANGELOG.md'),
        },
        {
          name: 'theme',
          text: '主题定制',
          markdown: resolve('site/docs/theme.md'),
        },
        {
          name: 'preview',
          text: '组件概览',
          template: resolve('site/theme/default/Preview.vue'),
          markdown: resolve('README.md'),
        },
        {
          name: 'components',
          text: 'Components',
          menu: generateSource()
        },
      ],
    },
  ],
  components: generateSource(),
  markdownBoundary: {
    '<!-- CUTOFF -->': '<div class="md-blog-cut-off"></div>',
    '<!-- LOGO -->':
      '<img src="//static.galileo.xiaojukeji.com/static/tms/other/mand-mobile-logo.png" width="200">',
  },
  links: [
    {
      title: '链接',
      link: [
        {
          text: 'GitHub',
          src: 'https://github.com/didi/mand-mobile',
        },
        {
          text: '更新日志',
          src: '//didi.github.io/mand-mobile/docs/changelog',
        },
        {
          text: '贡献指南',
          src: 'https://github.com/didi/mand-mobile/blob/master/CONTRIBUTING.md',
        },
        {
          text: '问题反馈',
          src: 'https://github.com/didi/mand-mobile/issues',
        }
      ],
    },
    {
      title: '更多产品',
      link: [
        {
          text: 'cube-ui <span>- Vue.js组件库</span>',
          src: 'https://didi.github.io/cube-ui',
        },
        {
          text: 'VirtualAPK <span>- Android 插件化框架</span>',
          src: 'https://didi.github.io/virtual-apk.html',
        }
      ],
    },
  ],
  copyRight: '2012-2018 Didi Chuxing. All Rights Reserved',
  routePrefix: '/mand-mobile',
  // staticPrefix: '//manhattan.didistatic.com/static/manhattan/mand-mobile',
}
