<template>
  <div class="mfe-blog-theme-default-doc doc-template">
    <div class="default-doc-content">
      <!-- 文档标题和描述，front-matter -->
      <div class="doc-content-top">
        <p class="doc-content-title" v-if="info.title" v-html="info.title"></p>
        <p class="doc-content-qrcode"
          v-if="info.preview"
          @mouseover="isQrcodeShow = true"
          @mouseleave="isQrcodeShow = false">
          <i class="icon-qr-code" :class="{active: isQrcodeShow}"></i>
          <transition name="slide-fade">
            <span class="qrcode-box" v-show="isQrcodeShow">
              <i v-if="lang === 'en-US'">Scan QR code to preview</i>
              <i v-else>扫码预览</i>
              <qr-code :text="info.preview"></qr-code>
            </span>
          </transition>
        </p>
      </div>
      <div class="doc-content-describe" v-if="info.describe" v-html="info.describe"></div>

      <!-- 文档头部信息，介绍和引入 -->
      <div class="doc-content-paragraph head" v-html="bodyHead"></div>

      <!-- 文档内嵌Demo -->
      <template v-if="demos && demos.length">
        <div class="default-doc-demo-container">
          <template v-if="demos[0].component.simple">
            <component :is="demos[0].component"></component>
          </template>
          <template v-else>
            <div class="default-doc-demo-list is-block">
              <template v-for="(demo, index) in demos">
                  <md-demo
                    v-if="demo.component.align === 'center'"
                    :key="index"
                    :demo="demo"
                    :lang="lang"
                    :codeShow="demoBoxShowStat[index]"
                    @toggle="toggleDemoBox(index)"
                    @edit="goToDemo(index)"
                  ></md-demo>
              </template>
            </div>
            <div class="default-doc-demo-list is-left">
              <template v-for="(demo, index) in demos">
                  <md-demo
                    v-if="demo.component.align === 'left' || (index % 2 === 0 && demo.component.align !== 'right' && demo.component.align !== 'center')"
                    :key="index"
                    :demo="demo"
                    :lang="lang"
                    :codeShow="demoBoxShowStat[index]"
                    @toggle="toggleDemoBox(index)"
                    @edit="goToDemo(index)"
                  ></md-demo>
              </template>
            </div>
            <div class="default-doc-demo-list is-right">
              <template v-for="(demo, index) in demos">
                  <md-demo
                    v-if="demo.component.align === 'right' || (index % 2 !== 0 && demo.component.align !== 'left' && demo.component.align !== 'center')"
                    :key="index"
                    :demo="demo"
                    :lang="lang"
                    :codeShow="demoBoxShowStat[index]"
                    @toggle="toggleDemoBox(index)"
                    @edit="goToDemo(index)"
                  ></md-demo>
              </template>
            </div>
          </template>
        </div>
      </template>

      <!-- 文档底部信息，API -->
      <div class="doc-content-paragraph tail"
        v-if="bodyTail"
        v-html="bodyTail">
      </div>

      <div class="doc-content-bottom">
        <router-link class="prev" :to="prevRoute.path" v-if="prevRoute">
          <i>Prev</i>
          <p v-html="prevRoute.meta.text"></p>
        </router-link>
        <router-link class="next" :to="nextRoute.path" v-if="nextRoute">
          <i>Next</i>
          <p v-html="nextRoute.meta.text"></p>
        </router-link>
      </div>
    </div>

    <!-- 文档目录索引 -->
    <div
      v-if="!hiddenToc"
      class="default-doc-toc"
      v-html="toc"
    >
    </div>
  </div>
</template>

<script>
import VueQRCodeComponent from 'vue-qrcode-component'
import MdDemo from './Demo'

export default {
  components: {
    'qr-code': VueQRCodeComponent,
    MdDemo
  },

  props: ['info', 'body', 'toc', 'demos'],

  data() {
    return {
      demoBoxShowStat: [],
      activeDemoBoxZoonPos: {},
      isTocStricky: false,
      isQrcodeShow: false,
      isCopySuccess: false,
    }
  },

  computed: {
    bodyHead() {
      return this.body.split('<!-- DEMO -->')[0]
    },
    bodyTail() {
      return this.body.split('<!-- DEMO -->')[1]
    },
    demoBox() {
      return $('.doc-demo-box')
    },
    previewBox() {
      return $('.doc-demo-box-preview')
    },
    codeBox() {
      return $('.doc-demo-box-code')
    },
    curRouteIndex() {
      return this.$route.meta.index
    },
    prevRoute() {
      return this.findRoute(this.curRouteIndex - 1, -1)
    },
    nextRoute() {
      return this.findRoute(this.curRouteIndex + 1, 1)
    },
    lang() {
      return ~this.$route.path.indexOf('zh-CN') ? 'zh-CN' : 'en-US'
    },
    hiddenToc() {
      return this.info.toc === 'hidden'
    }
  },

  mounted() {
    // if (!this.hiddenToc) {
    //   const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    //   $(window).bind('scroll', () => {
    //     const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    //     this.strickyTocBar(scrollTop)
    //     // this.strickyToggleBar(scrollTop)
    //   })
    //   this.strickyTocBar(scrollTop)
    // }
    
    if (location.hash) {
      const tmpHash = location.hash.substr(1)
      location.hash = ''
      location.hash = tmpHash
    }
  },

  methods: {
    findRoute(start, direction = 1) {
      const routes = window.$routes[this.lang]
      while (start >= 0 && start <= routes.length - 1 &&
            ((!routes[start].meta.src && !routes[start].meta.markdown) || routes[start].redirect)) {
        start += direction
      }

      return routes[start]
    },
    toggleDemoBox(index, event) {
      const demoBox = $(`.doc-demo-box-${index}`)
      const toggleBar = demoBox.find('.doc-demo-box-toggle')
      const stat = !this.demoBoxShowStat[index]

      if (stat) {
        toggleBar.addClass('active')
        // this.toggleStrickyToggleBar()
      } else {
        toggleBar.removeClass('active')
        // this.toggleStrickyToggleBar()
      }

      this.$set(this.demoBoxShowStat, index, stat)
    },
    // strickyTocBar(scrollTop) {
    //   window.requestAnimationFrame(() => {
    //     if (scrollTop > 96) {
    //       this.isTocStricky = true
    //     } else {
    //       this.isTocStricky = false
    //     }
    //   })
    // },
    // strickyToggleBar (scrollTop) {
    //   window.requestAnimationFrame(() => {
    //     this.toggleStrickyToggleBar(scrollTop)
    //   })
    // },
    // toggleStrickyToggleBar (scrollTop) {
    //   scrollTop = scrollTop || document.body.scrollTop || document.documentElement.scrollTop
    //   $.each($('.doc-demo-box-toggle'), (index, item) => {
    //     const width = $(item).width()
    //     const height = $(item).height()
    //     const demo = $(item).siblings('.doc-demo-box-code')
    //     const offset = demo.offset()
    //     const codeHeight = demo.height()
    //     const top = $(window).height() - (offset.top - scrollTop)
    //     const bottom = $(window).height() - (offset.top + codeHeight - scrollTop)
    //     if ($(item).hasClass('active') && top >= 0 && bottom <= 0) {
    //       if (!$(item).hasClass('is-stricky')) {
    //         $(item).css({maxWidth: `${width}px`, left: `${$(item).offset().left}px`})
    //         $(item).addClass('is-stricky')
    //       }
    //     } else {
    //       $(item).css({maxWidth: `${width}px`, left: '0px'})
    //       $(item).removeClass('is-stricky')
    //     }
    //   })
    // },
    goToDemo (index) {
      const component = this.info.preview.split('#')[1]
      if (component) {
        window.open(`https://github.com/didi/mand-mobile/edit/master/components/${component}/demo/cases/demo${index}.vue`)
      }
    },
    onCopySuccess (e) {
      this.isCopySuccess = true
      setTimeout(() => {
        this.isCopySuccess = false
      }, 1000)
    }
  },
}

</script>

<style lang="stylus">
.default-content-wrapper.stricky
  .default-doc-toc
    position fixed
    top 20px
    right 0

.mfe-blog-theme-default-doc
  position relative
  block()
  padding-right 12%
  border-left solid 1px #e8e8e8
  box-sizing border-box
  .doc-content-top, .doc-content-describe, .default-doc-content, .doc-content-paragraph
    block()
    box-sizing border-box
  .doc-content-top
    margin-bottom 20px
    .doc-content-title
      font-size 28px
      font-weight 500
      color #1f2f3d
    .doc-content-title, .doc-content-qrcode
      float left
      line-height 1
    .doc-content-qrcode
      position relative
      margin-top 4px
      margin-left 10px
      i.icon-qr-code
        font-size 22px
        color #999
        &.active
          color #3ca0e6
      span
        position absolute
        left -61px
        top 30px
        z-index 2
        width 150px
        // height 150px
        padding 10px 15px
        box-sizing border-box
        background #fff
        box-shadow 0 4px 8px rgba(0, 0, 0, .08)
        border-radius 4px
        border solid 1px #f0f0f0
        i
          display inline-block
          width 100%
          text-align center
          font-size 12px
          color #999
          font-style normal

    .doc-content-describe
      font-size 16px
      font-weight 400
      color #666
      margin-top 20px

  .doc-content-bottom
    block()
    position absolute
    left 0
    bottom 0
    padding 20px 64px
    box-sizing border-box
    a
      text-decoration none
      i
        color #999
        font-size 12px
        font-style normal
      p
        margin-top 5px
        color #2F86F6
        font-size 14px
    a.prev
      float left
      text-align left
    a.next
      float right
      text-align right

  .default-doc-content
    position relative
    min-height 800px
    padding 0 64px 87px

  .default-doc-demo-container
    block()
  .default-doc-demo-list
    float left
    width 49%
    &.is-right
      margin-left 2%
    &.is-block
      width 100%
      margin 0
      .doc-demo-box-preview-box
        max-width 100%
  .default-doc-demo, .doc-demo-box-info, .doc-demo-title, .doc-demo-describe, .doc-demo-box
    block()
    box-sizing border-box

@media (max-width: 1500px)
  .default-doc-demo-list.is-block
    .doc-demo-box-preview-box
      max-width 100% !important 
@media (max-width: 1200px)
  .default-doc-demo-list.is-block
    .doc-demo-box-preview-box
      max-width 100% !important 
@media (max-width: 1000px)
  .default-doc-demo-list
    width 100% !important
    margin-right 0 !important
  .mfe-blog-theme-default-doc
    padding-right 0 !important
  .default-doc-toc
    display none
@media (max-width: 750px)
  .mfe-blog-theme-default-doc
    padding 0
    .default-doc-content
      padding 15px 15px 100px 15px !important
      .doc-content-title
        font-size 22px !important
      .doc-content-qrcode i.icon-qr-code
        font-size 16px !important
      .doc-content-bottom
        padding 20px 15px !important
</style>
