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
          <div class="default-doc-demo-list">
            <div class="default-doc-demo"
              v-for="(demo, index) in demos"
              v-if="index % 2 === 0"
              :key="index">
              <div class="doc-demo-box"
                :class="[
                  `doc-demo-box-${index}`,
                  demoBoxShowStat[index] ? 'active' : ''
                ]"
              >
                <div class="doc-demo-box-info">
                  <template v-if="lang === 'en-US'">
                    <h4 class="doc-demo-title"
                      v-html="demo.component.titleEnUS || demo.component.title || 'Basic'"
                    ></h4>
                    <h5 class="doc-demo-describe"
                      v-if="demo.component.describeEnUS || demo.component.describe"
                      v-html="demo.component.describeEnUS || demo.component.describe"
                    ></h5>
                    <h5 class="doc-demo-message"
                      v-if="demo.component.messageEnUS || demo.component.message"
                      v-html="demo.component.messageEnUS || demo.component.message"
                    ></h5>
                  </template>
                  <template v-else>
                    <h4 class="doc-demo-title" v-html="demo.component.title || '基本'"></h4>
                    <h5 class="doc-demo-describe" v-if="demo.component.describe" v-html="demo.component.describe"></h5>
                    <h5 class="doc-demo-message" v-if="demo.component.message" v-html="demo.component.message"></h5>
                  </template>
                </div>
                <div class="doc-demo-box-preview">
                  <div class="doc-demo-box-preview-box" :style="{minHeight: `${demo.component.height}px`}">
                    <component :is="demo.component"></component>
                  </div>
                </div>
                <div class="doc-demo-box-code">
                  <div class="doc-demo-box-code-operate">
                    <i class="icon-hollowError"
                      @click="toggleDemoBox(index)"
                    ></i>
                    <template v-if="lang === 'en-US'">
                      <i :class="isCopySuccess ? 'icon-question' : 'icon-paper'"
                        v-tooltip="{content: isCopySuccess ? 'Copied' : 'Copy Code', offset: 5}"
                        v-clipboard:copy="decodeURI(demo.raw)"
                        v-clipboard:success="onCopySuccess"></i>
                      <i class="demo-codesandbox"
                        v-if="demo.component.codeSandBox"
                        v-tooltip="{content: 'Open in CodeSandBox', offset: 5}">
                        <a :href="demo.component.codeSandBox" target="_blank"></a>
                      </i>
                      <i class="icon-edit"
                        v-tooltip="{content: 'Edit this page on Github', offset: 5}"
                        @click="goToDemo(index)"
                      ></i>
                    </template>
                    <template v-else>
                      <i :class="isCopySuccess ? 'icon-question' : 'icon-paper'"
                        v-tooltip="{content: isCopySuccess ? '复制代码成功' : '复制代码', offset: 5}"
                        v-clipboard:copy="decodeURI(demo.raw)"
                        v-clipboard:success="onCopySuccess"></i>
                      <i class="demo-codesandbox"
                        v-if="demo.component.codeSandBox"
                        v-tooltip="{content: '在CodeSandBox打开', offset: 5}">
                        <a :href="demo.component.codeSandBox" target="_blank"></a>
                      </i>
                      <i class="icon-edit"
                        v-tooltip="{content: '在Github上编辑此页', offset: 5}"
                        @click="goToDemo(index)"
                      ></i>
                    </template>
                  </div>
                  <pre>
                    <code class="lang-vue" v-html="demo.code"></code>
                  </pre>
                </div>
                <div class="doc-demo-box-toggle" @click="toggleDemoBox(index)">
                  <template v-if="demoBoxShowStat[index]">
                    <i class="icon-triangle-up"></i>
                    <span v-if="lang === 'en-US'">Hide Code</span>
                    <span v-else>代码收起</span>
                  </template>
                  <template v-else>
                    <i class="icon-triangle-down"></i>
                    <span v-if="lang === 'en-US'">Show Code</span>
                    <span v-else>代码展示</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="default-doc-demo-list">
            <div class="default-doc-demo"
              v-for="(demo, index) in demos"
              v-if="index % 2 !== 0"
              :key="index">
              <div class="doc-demo-box"
                :class="[
                  `doc-demo-box-${index}`,
                  demoBoxShowStat[index] ? 'active' : ''
                ]"
              >
                <div class="doc-demo-box-info">
                  <template v-if="lang === 'en-US'">
                    <h4 class="doc-demo-title"
                      v-html="demo.component.titleEnUS || demo.component.title || 'Basic'"
                    ></h4>
                    <h5 class="doc-demo-describe"
                      v-if="demo.component.describeEnUS || demo.component.describe"
                      v-html="demo.component.describeEnUS || demo.component.describe"
                    ></h5>
                    <h5 class="doc-demo-message"
                      v-if="demo.component.messageEnUS || demo.component.message"
                      v-html="demo.component.messageEnUS || demo.component.message"
                    ></h5>
                  </template>
                  <template v-else>
                    <h4 class="doc-demo-title" v-html="demo.component.title || '基本'"></h4>
                    <h5 class="doc-demo-describe" v-if="demo.component.describe" v-html="demo.component.describe"></h5>
                    <h5 class="doc-demo-message" v-if="demo.component.message" v-html="demo.component.message"></h5>
                  </template>
                </div>
                <div class="doc-demo-box-preview">
                  <div class="doc-demo-box-preview-box" :style="{minHeight: `${demo.component.height}px`}">
                    <component :is="demo.component"></component>
                  </div>
                </div>
                <div class="doc-demo-box-code">
                  <div class="doc-demo-box-code-operate">
                    <i class="icon-hollowError"
                      @click="toggleDemoBox(index)"
                    ></i>
                    <template v-if="lang === 'en-US'">
                      <i :class="isCopySuccess ? 'icon-question' : 'icon-paper'"
                        v-tooltip="{content: isCopySuccess ? 'Copied' : 'Copy Code', offset: 5}"
                        v-clipboard:copy="decodeURI(demo.raw)"
                        v-clipboard:success="onCopySuccess"></i>
                      <i class="demo-codesandbox"
                        v-if="demo.component.codeSandBox"
                        v-tooltip="{content: 'Open in CodeSandBox', offset: 5}">
                        <a :href="demo.component.codeSandBox" target="_blank"></a>
                      </i>
                      <i class="icon-edit"
                        v-tooltip="{content: 'Edit this page on Github', offset: 5}"
                        @click="goToDemo(index)"
                      ></i>
                    </template>
                    <template v-else>
                      <i :class="isCopySuccess ? 'icon-question' : 'icon-paper'"
                        v-tooltip="{content: isCopySuccess ? '复制代码成功' : '复制代码', offset: 5}"
                        v-clipboard:copy="decodeURI(demo.raw)"
                        v-clipboard:success="onCopySuccess"></i>
                      <i class="demo-codesandbox"
                        v-if="demo.component.codeSandBox"
                        v-tooltip="{content: '在CodeSandBox打开', offset: 5}">
                        <a :href="demo.component.codeSandBox" target="_blank"></a>
                      </i>
                      <i class="icon-edit"
                        v-tooltip="{content: '在Github上编辑此页', offset: 5}"
                        @click="goToDemo(index)"
                      ></i>
                    </template>
                  </div>
                  <pre>
                    <code class="lang-vue" v-html="demo.code"></code>
                  </pre>
                </div>
                <div class="doc-demo-box-toggle" @click="toggleDemoBox(index)">
                  <template v-if="demoBoxShowStat[index]">
                    <i class="icon-triangle-up"></i>
                    <span v-if="lang === 'en-US'">Hide Code</span>
                    <span v-else>代码收起</span>
                  </template>
                  <template v-else>
                    <i class="icon-triangle-down"></i>
                    <span v-if="lang === 'en-US'">Show Code</span>
                    <span v-else>代码展示</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
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
      :class="{'is-stricky': isTocStricky}"
      v-html="toc">
    </div>
  </div>
</template>

<script>
import VueQRCodeComponent from 'vue-qrcode-component'
import { setTimeout } from 'timers';

export default {
  components: {
    'qr-code': VueQRCodeComponent,
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
    if (!this.hiddenToc) {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      $(window).bind('scroll', () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        this.strickyTocBar(scrollTop)
        // this.strickyToggleBar(scrollTop)
      })
      this.strickyTocBar(scrollTop)
    }
    
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
    strickyTocBar(scrollTop) {
      window.requestAnimationFrame(() => {
        if (scrollTop > 96) {
          this.isTocStricky = true
        } else {
          this.isTocStricky = false
        }
      })
    },
    strickyToggleBar (scrollTop) {
      window.requestAnimationFrame(() => {
        this.toggleStrickyToggleBar(scrollTop)
      })
    },
    toggleStrickyToggleBar (scrollTop) {
      scrollTop = scrollTop || document.body.scrollTop || document.documentElement.scrollTop
      $.each($('.doc-demo-box-toggle'), (index, item) => {
        const width = $(item).width()
        const height = $(item).height()
        const demo = $(item).siblings('.doc-demo-box-code')
        const offset = demo.offset()
        const codeHeight = demo.height()
        const top = $(window).height() - (offset.top - scrollTop)
        const bottom = $(window).height() - (offset.top + codeHeight - scrollTop)
        if ($(item).hasClass('active') && top >= 0 && bottom <= 0) {
          if (!$(item).hasClass('is-stricky')) {
            $(item).css({maxWidth: `${width}px`, left: `${$(item).offset().left}px`})
            $(item).addClass('is-stricky')
          }
        } else {
          $(item).css({maxWidth: `${width}px`, left: '0px'})
          $(item).removeClass('is-stricky')
        }
      })
    },
    goToDemo (index) {
      const component = this.info.preview.split('#')[1]
      if (component) {
        window.open(`https://github.com/didi/mand-mobile/edit/master/components/${component}/demo/cases/demo${index}.vue`)
      }
      console.log(this.info.preview, index)
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

<style lang="stylus" scoped>
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
        color #048EFA
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
    &:first-of-type
      margin-right 2%
  .default-doc-demo, .doc-demo-box-info, .doc-demo-title, .doc-demo-describe, .doc-demo-box
    block()
    box-sizing border-box
  .default-doc-demo
    margin-bottom 20px
    .doc-demo-box-info
      padding 15px
      .doc-demo-title
        display flex
        align-items center
        font-size 14px
        font-weight 500
      .doc-demo-describe
        margin-top 10px
        color #999
        font-size 14px
        font-weight 400
      .doc-demo-message
        display inline-block
        width 100%
        box-sizing border-box
        border-left .3em solid #048EFA
        padding  1em
        margin-left 0
        margin-top 10px
        background  rgba(252, 145, 83, 0.05)
        border-radius  4px
        font-weight 400
  .doc-demo-box
    position relative
    padding-bottom 44px
    border solid 1px #ebebeb
    border-radius 2px
    transition all .3s
    overflow hidden
    &:hover
      // box-shadow 0 0 8px rgba(0, 0, 0, .08)
      .doc-demo-box-toggle span
        transform translateX(0)
    &.active
      .doc-demo-box-code, .doc-demo-box-toggle
        display block
  .demo-codesandbox
    width 16px
    height 16px
    background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAsCAMAAAAgsQpJAAAAh1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwrRDr0AAAALHRSTlMA++Lla1M79+mNGhII793RXTIM2cXCn30grqV0SikjA764smVF81jHhZeVkzsH/ogAAAG8SURBVDjLnZTZloIwDECDsssiIIuioAIuY/7/+wZbUoVWnDP3iQO3TZOGgIx7Siv4TuxoiNrPCuapdRsZXenNefsEBYvLR83c4Ihwr9SKHUqcD4ocUEnmjr3SR0RNZVo3DwSXgGtWmqVCcOgotk45hMhJMtODiGd0X70lFxi9Vm2Rb7fcXniVjQBPQxLrBXLSCIJnGET/VBbiDlsPiFwbNgWfbXh1IlDjZky1YckP3IAair5g4nNN0qq0NmGfSSxYQkcpenTEnm0hRKrErpDvdGMCCPEVxBF9uHLYgfYAExHq5tmKPu9DT/fZndQwFjnxzRr60AjYLccAU5HiZay5ttQ3siiojsg4HgBmROqR0AT4KkKDaIBaHK/Xp6JLIv0bajF2LBKp0kqRVZeLHKusFWIbIAqRWMtifcW/iZD+Q7RnRTFkluDPiPUhwAEfjAU9b9yJ6DY7jSL3b7y8Q46Wv4urvUPn73KP1/5BC5drEr0oDxE1DcfjtzjjwNVkYqWfesdi11tJPxxnlyM+Mn/QUlMeyyEKbBb148zVqaZMo3mnIi67l2blMXzGdagAdxdmoHlJA3KeKExMkPgFSQZ1ZV06NgQAAAAASUVORK5CYII=') no-repeat
    background-size contain
    a
      float left
      width 100%
      height 100%
      margin 0
  .doc-demo-box-preview
    position relative
    float left
    width 100%
    padding 10px 0
    box-sizing border-box
    border-top solid 1px #ebebeb
    background #f3f4f5
    .doc-demo-box-preview-box
      position relative
      width 100%
      max-width 450px
      margin 0 auto
      overflow hidden
      .md-example-child
        zoom .6
      ul>li
        list-style none !important
  .doc-demo-box-code
    position relative
    display none
    width 100%
    overflow hidden
    box-sizing border-box
    border-top dashed 1px #ebebeb
    pre
      margin-bottom 0
      background #fff
      transition all .3s
  .doc-demo-box-toggle
    // display none
    position absolute
    bottom 0
    left 0
    right 0
    z-index 1102
    width 100%
    height 44px
    border-top solid 1px #ebebeb
    cursor pointer
    text-align center
    line-height 44px
    font-size 12px
    color #ccc
    transition background .3s
    background #fff
    overflow hidden
    i
      font-size 24px
    span
      position absolute
      top 0
      right 20px
      transform translateX(200%)
      transition transform .3s ease-in-out
      font-weight 500
    &:hover
      background #fafafa
      i, span
      color #256fa3
    &.is-stricky
      position fixed
      bottom 0

  .doc-demo-box-code-operate
    position absolute
    top 0
    right 0
    z-index 100
    padding 10px 0
    cursor pointer
    i
      float right
      margin-right 10px
      font-size 16px
      color #ccc
      transition all .3s
      &:hover
        transform scale(1.2)
      &:active, &:visited, &:focus
        box-shadow none
        outline none

@media (max-width: 1500px)
  .doc-demo-box-preview-box
    max-width 400px !important
    .md-example-child
      zoom .533 !important
@media (max-width: 1200px)
  .doc-demo-box-preview-box
    max-width 350px !important
    .md-example-child
      zoom .467 !important
@media (max-width: 1000px)
  .default-doc-demo-list
    width 100% !important
    margin-right 0 !important
    .doc-demo-box-preview-box
      width 100% !important
    .doc-demo-box-code
      position static
      float left
      width 100%
      border-left none !important
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
