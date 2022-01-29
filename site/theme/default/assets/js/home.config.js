import MfeTable from '../../components/Table'
// import MfeGitStar from '../../components/GitStar'

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
  template: '<mfe-table v-model="qrcodeTableShow" style="width:160px;height:160px;top:65px;left:-10px;overflow:hidden;"><img src="//manhattan.didistatic.com/static/manhattan/mand-mobile/2.0/docs/mand-doc-home-qrcode.png" alt=""></mfe-table>'
}

export default {
  'zh-CN': {
    banner: {
      describe: '打造面向金融场景的 Vue 移动端 UI 组件库，灵活快速、丰富实用；用于敏捷搭建差异化的金融类产品，力求让复杂场景变得简单，辅助用户认知提效。',
      buttons: [{
        type: 'link',
        text: '开始使用',
        src: '/zh-CN/docs',
        theme: 'start'
      }, {
        type: 'handler',
        text: '扫码体验',
        click (ref) {
          this.$refs[ref][0].qrcodeTableShow = true
        },
        theme: 'demo',
        slots: qrcodeTableView
      }
        // , {
        // htmls: '<a class="github-button" href="https://github.com/didi/mand-mobile" data-size="large" data-show-count="true" aria-label="Star didi/mand-mobile on GitHub">Star</a>'
        //   type: 'other',
        //   slots: MfeGitStar
        // }
      ],
    },
    characteristics: [{
      icon: 'https://pt-starimg.didistatic.com/static/starimg/img/GDy7ZTZGXn1643289787881.png',
      title: '组件丰富',
      describe: '差异化类型几乎覆盖全类金融场景',
    }, {
      icon: 'https://pt-starimg.didistatic.com/static/starimg/img/u9HAIk80M21643289787852.png',
      title: '易用性高',
      describe: '组件模组均配有详细文档和案例演示',
    }, {
      icon: 'https://pt-starimg.didistatic.com/static/starimg/img/ETiQLn5fbL1643289787726.png',
      title: '设计轻量',
      describe: '扁平化设计为应用带来清爽简洁的美感',
    }, {
      icon: 'https://pt-starimg.didistatic.com/static/starimg/img/6XkXESKFL51643289787721.png',
      title: '更多期待',
      describe: '未来会在数量和品质上持续迭代...',
    }, ]
  },
  'en-US': {
    banner: {
      describe: 'Create a Vue mobile UI component library for financial scenarios, which is flexible, fast, rich and practical; it is used to agilely build differentiated financial products, and strives to simplify complex scenarios and assist users to improve their cognition and efficiency.',
      buttons: [{
        type: 'link',
        text: 'Get Started',
        src: '/en-US/docs',
        theme: 'start'
      }, {
        type: 'handler',
        text: 'Scan QR Code',
        click (ref) {
          this.$refs[ref][0].qrcodeTableShow = true
        },
        theme: 'demo',
        slots: qrcodeTableView
      }
        // , {
        // htmls: '<a class="github-button" href="https://github.com/didi/mand-mobile" data-size="large" data-show-count="true" aria-label="Star didi/mand-mobile on GitHub">Star</a>'
        //   type: 'other',
        //   slots: MfeGitStar
        // }
      ],
    },
    characteristics: [{
      icon: 'https://pt-starimg.didistatic.com/static/starimg/img/GDy7ZTZGXn1643289787881.png',
      title: 'Rich components',
      describe: 'Different types cover almost all financial scenarios',
    }, {
      icon: 'https://pt-starimg.didistatic.com/static/starimg/img/u9HAIk80M21643289787852.png',
      title: 'Ease of use',
      describe: 'Component modules are equipped with detailed documentation and case demonstrations',
    }, {
      icon: 'https://pt-starimg.didistatic.com/static/starimg/img/ETiQLn5fbL1643289787726.png',
      title: 'Lightweight design',
      describe: 'Flat design brings a clean and simple aesthetic to the app',
    }, {
      icon: 'https://pt-starimg.didistatic.com/static/starimg/img/6XkXESKFL51643289787721.png',
      title: 'More expectations',
      describe: 'In the future, it will continue to iterate in terms of quantity and quality...',
    }, ]
  },
}
