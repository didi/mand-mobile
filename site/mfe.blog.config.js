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

function generateSource (lang = 'zh-CN') {
  const menus = []
  components.forEach(category => {
    const list = category.list
    const subMenus = []

    list && list.forEach(component => {
      subMenus.push({
        name: component.path.substr(1),
        text: lang === 'en-US'
          ? `${component.name}`
          : `${component.name} <span>${component.text}</span>`,
        markdown: lang === 'en-US'
          ? resolve(`components${component.path}/README.en-US.md`)
          : resolve(`components${component.path}/README.md`),
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
  subtitleEnUs: 'A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios',
  logo: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg',
  favicon: '//static.galileo.xiaojukeji.com/static/tms/other/mand-mobile-logo.png',
  source: [{
    name: 'zh-CN',
    text: '中文',
    src: '/zh-CN/',
    menu: [{
      name: 'docs',
      text: '组件',
      src: '/zh-CN/docs/introduce',
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
        // {
        //   name: 'preview',
        //   text: '组件概览',
        //   template: resolve('site/theme/default/Preview.vue'),
        //   markdown: resolve('README.md'),
        // },
        {
          name: 'migration',
          text: '从1.x迁移',
          markdown: resolve('site/docs/migration.md'),
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
      src: '/zh-CN/design/principle/intuition',
      menu: [{
        name: 'principle',
        text: '原则',
        menu: [{
          name: 'intuition',
          text: '直观简单',
          markdown: resolve('site/docs/design/principle/intuition.md'),
        }, {
          name: 'security',
          text: '安全可控',
          markdown: resolve('site/docs/design/principle/security.md'),
        }, {
          name: 'professional',
          text: '体贴专业',
          markdown: resolve('site/docs/design/principle/professional.md'),
        }],
      }, {
        name: 'vision',
        text: '视觉',
        menu: [{
          name: 'color',
          text: '色彩',
          markdown: resolve('site/docs/design/vision/color.md'),
        }, {
          name: 'layout',
          text: '布局',
          markdown: resolve('site/docs/design/vision/layout.md'),
        }, {
          name: 'font',
          text: '字体',
          markdown: resolve('site/docs/design/vision/font.md'),
        }],
      }, {
        name: 'other',
        text: '其它',
        menu: [{
          name: 'resource',
          text: '资源',
          markdown: resolve('site/docs/design/other/resource.md'),
        }],
      }]
    },
    {
      name: 'palette',
      text: '调色板',
      src: 'https://mand-mobile.github.io/palette',
      // dot: true
    }]
  }, {
    name: 'en-US',
    text: 'English',
    src: '/en-US/',
    menu: [{
      name: 'docs',
      text: 'Components',
      src: '/en-US/docs/introduce',
      menu: [
        {
          name: 'introduce',
          text: 'Mand Mobile',
          markdown: resolve('site/docs/introduce.en-US.md'),
        },
        {
          name: 'started',
          text: 'Quick Start',
          markdown: resolve('site/docs/started.en-US.md'),
        },
        {
          name: 'development',
          text: 'Development Guide',
          markdown: resolve('site/docs/development.en-US.md'),
        },
        {
          name: 'changelog',
          text: 'Change Log',
          markdown: resolve('CHANGELOG.en-US.md'),
        },
        {
          name: 'theme',
          text: 'Custom Theme',
          markdown: resolve('site/docs/theme.en-US.md'),
        },
        // {
        //   name: 'preview',
        //   text: 'Component Preview',
        //   template: resolve('site/theme/default/Preview.vue'),
        //   markdown: resolve('README.md'),
        // },
        {
          name: 'migration',
          text: 'Migration from 1.x',
          markdown: resolve('site/docs/migration.en-US.md'),
        },
        {
          name: 'components',
          text: 'Components',
          menu: generateSource('en-US')
        },
      ],
    },
    {
      name: 'design',
      text: 'Design',
      src: '/en-US/design/principle/intuition',
      menu: [{
        name: 'principle',
        text: 'Principle',
        menu: [{
          name: 'intuition',
          text: 'Intuitive and simple',
          markdown: resolve('site/docs/design/principle/intuition.en-US.md'),
        }, {
          name: 'security',
          text: 'Safe and controllable',
          markdown: resolve('site/docs/design/principle/security.en-US.md'),
        }, {
          name: 'professional',
          text: 'Thoughtful and professional',
          markdown: resolve('site/docs/design/principle/professional.en-US.md'),
        }],
      }, {
        name: 'vision',
        text: 'Vision',
        menu: [{
          name: 'color',
          text: 'Color',
          markdown: resolve('site/docs/design/vision/color.en-US.md'),
        }, {
          name: 'layout',
          text: 'Layout',
          markdown: resolve('site/docs/design/vision/layout.en-US.md'),
        }, {
          name: 'font',
          text: 'Font',
          markdown: resolve('site/docs/design/vision/font.en-US.md'),
        }],
      }, {
        name: 'other',
        text: 'Other',
        menu: [{
          name: 'resource',
          text: 'Resource',
          markdown: resolve('site/docs/design/other/resource.en-US.md'),
        }],
      }]
    },
    {
      name: 'palette',
      text: 'Palette',
      src: 'https://mand-mobile.github.io/palette',
    }]
  }],
  components: generateSource(),
  markdownBoundary: {
    '<!-- CUTOFF -->': '<div class="md-blog-cut-off"></div>',
    '<!-- LOGO -->':
      '<img src="//static.galileo.xiaojukeji.com/static/tms/other/mand-mobile-logo.png" width="200">',
  },
  links: {
    'zh-CN': [
      {
        title: '相关资源',
        link: [
          {
            text: 'GitHub',
            src: 'https://github.com/mand-mobile',
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
            text: '调色板',
            src: 'https://mand-mobile.github.io/palette'
          },
          {
            text: '国内镜像 🇨🇳',
            src: 'https://mand-mobile.gitee.io/docs/index.gitee.html#/zh-CN/home'
          },
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
        title: '更多产品 <a href="http://opensource.didiglobal.com" style="position:relative;top:3px;margin-left:5px;"><img height="18" src="//manhattan.didistatic.com/static/manhattan/mand/docs/didi-logo-white.png"/>',
        link: [
          {
            text: 'Chameleon <span>- 跨端解决方案</span>',
            src: 'https://CML.JS.org',
          },
          {
            text: 'Cube UI <span>- Vue.js组件库</span>',
            src: 'https://didi.github.io/cube-ui',
          },
          {
            text: 'Pile.js <span>- React组件库</span>',
            src: 'https://github.com/didi/pile.js',
          },
          {
            text: 'MPX <span>- 增强型小程序框架</span>',
            src: 'https://github.com/didi/mpx/',
          },
          {
            text: 'DoraemonKit <span>- iOS开发助手</span>',
            src: 'https://github.com/didi/doraemonKit/',
          },
          {
            text: 'VirtualAPK <span>- Android插件化框架</span>',
            src: 'https://didi.github.io/virtual-apk.html',
          }
        ],
      },
    ],
    'en-US': [
      {
        title: 'Resources',
        link: [
          {
            text: 'GitHub',
            src: 'https://github.com/mand-mobile',
          },
          {
            text: 'Change Log',
            src: 'https://github.com/didi/mand-mobile/blob/master/CHANGELOG.md',
          },
          {
            text: 'FAQ',
            src: 'https://github.com/didi/mand-mobile/wiki/FAQ',
          },
          {
            text: 'Template',
            src: 'https://github.com/mand-mobile/mand-mobile-template',
          },
          {
            text: 'Palette',
            src: 'https://mand-mobile.github.io/palette'
          },
          {
            text: 'China Mirror 🇨🇳',
            src: 'https://mand-mobile.gitee.io/docs/index.gitee.html#/en-US/home'
          },
        ],
      },
      {
        title: 'Community',
        link: [
          {
            text: 'Contribute Guide',
            src: 'https://github.com/didi/mand-mobile/blob/master/CONTRIBUTING.md',
          },
          {
            text: 'Issues',
            src: 'https://github.com/didi/mand-mobile/issues',
          },
          {
            text: 'Join Us',
            src: 'http://job.didichuxing.com/',
          }
        ]
      },
      {
        title: 'More Products <a href="http://opensource.didiglobal.com" style="position:relative;top:3px;margin-left:5px;"><img height="18" src="//manhattan.didistatic.com/static/manhattan/mand/docs/didi-logo-white.png"/>',
        link: [
          {
            text: 'Chameleon <span>- Cross-end Framework</span>',
            src: 'https://CML.JS.org',
          },
          {
            text: 'Cube UI <span>- Vue.js UI Lib</span>',
            src: 'https://didi.github.io/cube-ui',
          },
          {
            text: 'Pile.js <span>- React Components</span>',
            src: 'https://github.com/didi/pile.js',
          },
          {
            text: 'MPX <span>- Enhanced Miniprogram Framework</span>',
            src: 'https://github.com/didi/mpx/',
          },
          {
            text: 'VirtualAPK <span>- Android Plugin Framework</span>',
            src: 'https://didi.github.io/virtual-apk.html',
          },
          {
            text: 'DoraemonKit <span>- iOS Development Assistant</span>',
            src: 'https://github.com/didi/doraemonKit/',
          }
        ],
      },
    ]
  },
  copyRight: '2012-2019 Didi Chuxing. All Rights Reserved',
  routePrefix: '/mand-mobile',
  // staticPrefix: '//manhattan.didistatic.com/static/manhattan/mand-mobile',
}
