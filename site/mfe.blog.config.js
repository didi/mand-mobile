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
  subtitle: '面向金融场景的Vue移动端UI组件库',
  logo: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg',
  favicon: '//static.galileo.xiaojukeji.com/static/tms/other/mand-mobile-logo.png',
  source: [
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
    {
      name: 'design',
      text: '设计',
      src: '/design/resource',
      menu: [
        {
          name: 'resource',
          text: '设计资源',
          markdown: resolve('site/docs/design/resource.md'),
        },
        {
          name: 'color',
          text: '颜色',
          markdown: resolve('site/docs/design/color.md'),
        },
        {
          name: 'font',
          text: '字体',
          markdown: resolve('site/docs/design/font.md'),
        },
        {
          name: 'other',
          text: '其他',
          markdown: resolve('site/docs/design/other.md'),
        }
      ]
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
      title: '相关资源',
      link: [
        {
          text: 'GitHub',
          src: 'https://github.com/didi/mand-mobile',
        },
        {
          text: '更新日志',
          src: 'https://github.com/didi/mand-mobile/blob/master/CHANGELOG.md',
        },
        {
          text: '常见问题',
          src: 'https://github.com/didi/mand-mobile/wiki/FAQ',
        },
        {
          text: '脚手架模板',
          src: 'https://github.com/mand-mobile/mand-mobile-template',
        },
        {
          text: '国内镜像 🇨🇳',
          src: 'https://mand-mobile.gitee.io/docs/index.gitee.html',
        }
      ],
    },
    {
      title: '社区',
      link: [
        {
          text: '贡献指南',
          src: 'https://github.com/didi/mand-mobile/blob/master/CONTRIBUTING.md',
        },
        {
          text: '问题反馈',
          src: 'https://github.com/didi/mand-mobile/issues',
        },
        {
          text: '加入我们',
          src: 'http://job.didichuxing.com/',
        }
      ]
    },
    {
      title: '更多产品 <a href="https://didi.github.io/" style="position:relative;top:3px;margin-left:5px;"><img height="18" src="//manhattan.didistatic.com/static/manhattan/mand/docs/didi-logo-white.png"/>',
      link: [
        {
          text: 'Cube UI <span>- Vue.js组件库</span>',
          src: 'https://didi.github.io/cube-ui',
        },
        {
          text: 'Pile.js <span>- React组件库</span>',
          src: 'https://github.com/didi/pile.js',
        },
        {
          text: 'VirtualAPK <span>- Android插件化框架</span>',
          src: 'https://didi.github.io/virtual-apk.html',
        },
        {
          text: 'Gendry <span>- Go数据库操作工具集</span>',
          src: 'https://github.com/didi/gendry/',
        }
      ],
    },
  ],
  copyRight: '2012-2018 Didi Chuxing. All Rights Reserved',
  routePrefix: '/mand-mobile',
  // staticPrefix: '//manhattan.didistatic.com/static/manhattan/mand-mobile',
}
