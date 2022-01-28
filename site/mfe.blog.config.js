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
          demo: [resolve('site/theme/default/components/GitContributors.vue')]
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
          name: 'faq',
          text: '常见问题',
          link: 'https://github.com/didi/mand-mobile/wiki/FAQ---%E4%B8%AD%E6%96%87',
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
      src: '/zh-CN/design/mand-design/introduce',
      menu: [{
        name: 'mand-design',
        text: 'Mand Design',
        menu: [{
          name: 'introduce',
          text: 'FD+介绍',
          markdown: resolve('site/docs/design/preface/introduce.md')
        }, {
          name: 'viewpoint',
          text: '设计价值观',
          markdown: resolve('site/docs/design/preface/viewpoint.md')
        }]
      }, {
        name: 'principle',
        text: '原则',
        menu: [{
          name: 'intuition',
          text: '直观简单',
          markdown: resolve('site/docs/design/principle/intuition.md'),
        }, {
          name: 'clear-controllable',
          text: '清晰可控',
          markdown: resolve('site/docs/design/principle/clear-controllable.md'),
        }, {
          name: 'security',
          text: '安全感知',
          markdown: resolve('site/docs/design/principle/security.md'),
        }, {
          name: 'attitude',
          text: '态度专业',
          markdown: resolve('site/docs/design/principle/attitude.md'),
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
        }, {
          name: 'icon',
          text: '图标',
          markdown: resolve('site/docs/design/vision/icon.md'),
        }, {
          name: 'layer',
          text: '层级',
          markdown: resolve('site/docs/design/vision/layer.md'),
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
    },
    {
      name: 'mand-mobile-rn',
      text: 'Mand Mobile RN',
      src: 'https://didi.github.io/mand-mobile-rn',
      dot: true
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
          demo: [resolve('site/theme/default/components/GitContributors.vue')]
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
        {
          name: 'faq',
          text: 'FAQ',
          link: 'https://github.com/didi/mand-mobile/wiki/FAQ',
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
      src: '/en-US/design/mand-design/introduce',
      menu: [{
        name: 'mand-design',
        text: 'Mand Design',
        menu: [{
          name: 'introduce',
          text: 'FD+introduction',
          markdown: resolve('site/docs/design/preface/introduce.en-US.md')
        }, {
          name: 'viewpoint',
          text: 'Design values',
          markdown: resolve('site/docs/design/preface/viewpoint.en-US.md')
        }]
      }, {
        name: 'principle',
        text: 'Principle',
        menu: [{
          name: 'intuition',
          text: 'Intuitive and simple',
          markdown: resolve('site/docs/design/principle/intuition.en-US.md'),
        }, {
          name: 'clear-controllable',
          text: 'Clear and controllable',
          markdown: resolve('site/docs/design/principle/clear-controllable.en-US.md'),
        }, {
          name: 'security',
          text: 'Security perception',
          markdown: resolve('site/docs/design/principle/security.en-US.md'),
        }, {
          name: 'attitude',
          text: 'Thoughtful and attitude',
          markdown: resolve('site/docs/design/principle/attitude.en-US.md'),
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
        }, {
          name: 'icon',
          text: 'Icon',
          markdown: resolve('site/docs/design/vision/icon.en-US.md'),
        }, {
          name: 'layer',
          text: 'Layer',
          markdown: resolve('site/docs/design/vision/layer.en-US.md'),
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
    },
    {
      name: 'mand-mobile-rn',
      text: 'Mand Mobile RN',
      src: 'https://didi.github.io/mand-mobile-rn',
      dot: true
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
            text: 'Mand Mobile',
            src: 'https://github.com/didi/mand-mobile',
          },
          {
            text: 'Mand Mobile RN',
            src: 'https://github.com/didi/mand-mobile-rn',
          },
          {
            text: '脚手架模板',
            src: 'https://github.com/mand-mobile/mand-mobile-template',
          },
          {
            text: '调色板 - 主题编辑工具',
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
            text: 'Organization',
            src: 'https://github.com/mand-mobile'
          },
          {
            text: '码云',
            src: 'https://gitee.com/mand-mobile/mand-mobile'
          },
          {
            text: '官方交流群',
            src: 'https://shang.qq.com/wpa/qunwpa?idkey=97670d381924f2d46c53960715577502285952dd12f67e5dc9727f554955a254'
          }
        ],
      },
      {
        title: '帮助',
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
            text: '更新日志',
            src: 'https://github.com/didi/mand-mobile/blob/master/CHANGELOG.md',
          },
          {
            text: '常见问题',
            src: 'https://github.com/didi/mand-mobile/wiki/FAQ',
          },
          {
            text: '加入我们',
            src: 'http://job.didichuxing.com/',
          }
        ]
      },
      {
        title: '更多产品 <a href="http://opensource.didiglobal.com" style="position:relative;top:3px;margin-left:5px;"><img height="16" src="//manhattan.didistatic.com/static/manhattan/mand/docs/didi-logo-white.png"/>',
        link: [
          {
            text: 'Chameleon - 跨端解决方案',
            src: 'https://cmljs.org/#/',
          },
          {
            text: 'Cube UI - Vue.js组件库',
            src: 'https://didi.github.io/cube-ui',
          },
          {
            text: 'Pile.js - React组件库',
            src: 'https://github.com/didi/pile.js',
          },
          {
            text: 'MPX - 增强型小程序框架',
            src: 'https://github.com/didi/mpx/',
          },
          {
            text: 'DoraemonKit - iOS开发助手',
            src: 'https://github.com/didi/doraemonKit/',
          },
          {
            text: 'VirtualAPK - Android插件化框架',
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
            text: 'Mand Mobile',
            src: 'https://github.com/didi/mand-mobile',
          },
          {
            text: 'Mand Mobile RN',
            src: 'https://github.com/didi/mand-mobile-rn',
          },
          {
            text: 'Template',
            src: 'https://github.com/mand-mobile/mand-mobile-template',
          },
          {
            text: 'Palette - Theme Editing Tool',
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
            text: 'Organization',
            src: 'https://github.com/mand-mobile'
          },
          {
            text: 'Gitee',
            src: 'https://gitee.com/mand-mobile/mand-mobile'
          },
          {
            text: 'Official Communication Group',
            src: 'https://shang.qq.com/wpa/qunwpa?idkey=97670d381924f2d46c53960715577502285952dd12f67e5dc9727f554955a254'
          }
        ],
      },
      {
        title: 'Help',
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
            text: 'Change Log',
            src: 'https://github.com/didi/mand-mobile/blob/master/CHANGELOG.md',
          },
          {
            text: 'FAQ',
            src: 'https://github.com/didi/mand-mobile/wiki/FAQ',
          },
          {
            text: 'Join Us',
            src: 'http://job.didichuxing.com/',
          }
        ]
      },
      {
        title: 'More Products <a href="http://opensource.didiglobal.com" style="position:relative;top:3px;margin-left:5px;"><img height="16" src="//manhattan.didistatic.com/static/manhattan/mand/docs/didi-logo-white.png"/>',
        link: [
          {
            text: 'Chameleon - Cross-end Framework',
            src: 'https://cmljs.org/#/',
          },
          {
            text: 'Cube UI - Vue.js UI Lib',
            src: 'https://didi.github.io/cube-ui',
          },
          {
            text: 'Pile.js - React Components',
            src: 'https://github.com/didi/pile.js',
          },
          {
            text: 'MPX - Enhanced Miniprogram Framework',
            src: 'https://github.com/didi/mpx/',
          },
          {
            text: 'VirtualAPK - Android Plugin Framework',
            src: 'https://didi.github.io/virtual-apk.html',
          },
          {
            text: 'DoraemonKit - iOS Development Assistant',
            src: 'https://github.com/didi/doraemonKit/',
          }
        ],
      },
    ]
  },
  copyRight: '2012-2022 Didi Chuxing. All Rights Reserved',
  routePrefix: '/mand-mobile',
  // staticPrefix: '//manhattan.didistatic.com/static/manhattan/mand-mobile',
}
