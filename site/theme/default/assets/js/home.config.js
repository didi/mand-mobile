import MfeTable from '../../components/Table'
import MfeGitStar from '../../components/GitStar'

const qrcodeTableView = {
  name: 'qrcodeTable',
  components: {
    MfeTable
  },
  data () {
    return {
      qrcodeTableShow: false
    }
  },
  template: '<mfe-table v-model="qrcodeTableShow" style="width:160px;height:160px;top:65px;left:-10px;overflow:hidden;"><img src="//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-qrcode.png" alt=""></mfe-table>'
}

export default {
  'zh-CN': [
    {
      title: 'Mand Mobile',
      describe: '面向金融场景的Vue移动端UI组件库，丰富、灵活、实用，快速搭建优质的金融类产品，让复杂的金融场景变简单。',
      buttons: [{
        type: 'link',
        text: '开始使用',
        src: '/docs',
        theme: 'start'
      }, {
        type: 'handler',
        text: '扫码体验',
        click (ref) {
          this.$refs[ref][0].qrcodeTableShow = true
        },
        theme: 'demo',
        slots: qrcodeTableView
      }, {
        // htmls: '<a class="github-button" href="https://github.com/didi/mand-mobile" data-size="large" data-show-count="true" aria-label="Star didi/mand-mobile on GitHub">Star</a>'
        type: 'other',
        slots: MfeGitStar
      }],
      animations: {
        bg: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-0.svg',
        content: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-0.png'
      }
    },
    {
      title: '用户体验',
      describe: '基于「合理、好用」设计价值观，从交互操作、视觉抽象、图形可视等角度共同解决问题。 ',
      animations: {
        bg: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-1.svg',
        content: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-1.png'
      },
      decorate: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-cirlce.svg'
    },
    {
      title: '敏捷支持',
      describe: '汲取最前沿技术，组件化轻量化实现，兼顾稳定和品质，努力实现金融场景的全覆盖。',
      animations: [
        {
          icon: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-2-0.svg',
          title: '丰富的组件',
          describe: '30+的基础组件，覆盖金融场景',
        },
        {
          icon: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-2-1.svg',
          title: '极高的易用性',
          describe: '组件均有详细说明文档、案例演示',
        },
        {
          icon: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-2-2.svg',
          title: '轻量的Bundle',
          describe: '支持<a href="https://github.com/ant-design/babel-plugin-import" target="_blank">babel-plugin-import</a>自动化按需加载代码，减小bundle体积',
        }
      ]
    },
    {
      title: '共享资源',
      describe: '提供相关资源的下载，输出规范，助力快速搭建优质产品页面原型或高保真视觉稿。',
      buttons: [{
        type: 'link',
        text: '设计资源',
        src: '/zh-CN/design/resource',
        theme: 'demo'
      }],
      animations: {
        bg: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-3.svg',
        content: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-3.png'
      },
      decorate: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-rectangle.svg'
    },
  ],
  'en-US': [
    {
      title: 'Mand Mobile',
      describe: 'A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios. Rich, flexible, practical, quickly build high-quality financial products, making complex financial scenarios easier.',
      buttons: [{
        type: 'link',
        text: 'Get Started',
        src: '/docs',
        theme: 'start'
      }, {
        type: 'handler',
        text: 'Scan QR Code',
        click (ref) {
          this.$refs[ref][0].qrcodeTableShow = true
        },
        theme: 'demo',
        slots: qrcodeTableView
      }, {
        // htmls: '<a class="github-button" href="https://github.com/didi/mand-mobile" data-size="large" data-show-count="true" aria-label="Star didi/mand-mobile on GitHub">Star</a>'
        type: 'other',
        slots: MfeGitStar
      }],
      animations: {
        bg: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-0.svg',
        content: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-0.png'
      }
    },
    {
      title: 'User Experience',
      describe: 'Based on the "reasonable and easy to use" design values, we will jointly solve problems from the perspective of interactive operation, visual abstraction, and graphic visualization.',
      animations: {
        bg: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-1.svg',
        content: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-1.png'
      },
      decorate: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-cirlce.svg'
    },
    {
      title: 'Agile Support',
      describe: 'Gain access to the most cutting-edge technologies, achieve lightweight components, balance stability and quality, and strive to achieve full coverage of financial scenarios.',
      animations: [
        {
          icon: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-2-0.svg',
          title: 'Rich components',
          describe: '30+ basic components covering financial scenarios',
        },
        {
          icon: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-2-1.svg',
          title: 'Extremely easy to use',
          describe: 'Components have detailed documentation and case demos',
        },
        {
          icon: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-2-2.svg',
          title: 'Lightweight Bundle',
          describe: 'Support <a href="https://github.com/ant-design/babel-plugin-import" target="_blank">babel-plugin-import</a> automated on-demand loading of code to reduce the volume of bundles',
        }
      ]
    },
    {
      title: 'Share Resource',
      describe: 'Provides downloading and output of related resources to help quickly build high-quality product page prototypes or high-fidelity visuals.',
      buttons: [{
        type: 'link',
        text: 'Resource',
        src: '/en-US/design/resource',
        theme: 'demo'
      }],
      animations: {
        bg: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-3.svg',
        content: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-3.png'
      },
      decorate: '//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-rectangle.svg'
    },
  ]
}
