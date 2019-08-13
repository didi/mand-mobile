<template>
  <div class="default-doc-demo">
    <div
      class="doc-demo-box"
      :class="[codeShow ? 'active' : '']"
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
      <div class="doc-demo-box-preview" :style="{background:demo.component.background || '#f9fafb'}">
        <div class="doc-demo-box-preview-box" :style="{minHeight: `${demo.component.height}px`}">
          <component :is="demo.component"></component>
        </div>
      </div>
      <div class="doc-demo-box-code">
        <div class="doc-demo-box-code-operate">
          <i class="icon-hollowError"
            @click="toggleDemoBox"
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
              @click="goToDemo"
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
              @click="goToDemo"
            ></i>
          </template>
        </div>
        <pre>
          <code class="lang-vue" v-html="demo.code"></code>
        </pre>
      </div>
      <div class="doc-demo-box-toggle" @click="toggleDemoBox">
        <template v-if="codeShow">
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
</template>

<script>
export default {
  props: {
    lang: {
      type: String
    },
    codeShow: {
      type: Boolean,
      default: false
    },
    demo: {
      type: Object
    },
  },
  data () {
    return {
      isCopySuccess: false
    }
  },
  methods: {
    onCopySuccess (e) {
      this.isCopySuccess = true
      setTimeout(() => {
        this.isCopySuccess = false
      }, 1000)
    },
    toggleDemoBox() {
      this.$emit('toggle')
    },
    goToDemo() {
      this.$emit('edit')
    }
  }
}
</script>

<style lang="stylus">
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
      border-left .3em solid #2F86F6
      padding  1em
      margin-left 0
      margin-top 10px
      background  rgba(252, 145, 83, 0.05)
      border-radius  4px
      font-weight 400
.doc-demo-box
  position relative
  padding-bottom 24px
  border solid 1px #efefef
  // box-shadow 0px 2px 1px -1px rgba(0,0,0,0.08), 0px 1px 1px 0px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.1)
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
  background #F9FAFB
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
    padding-bottom 0
    background #fff
    transition all .3s
    code:after
      left 5px
      right auto !important
.doc-demo-box-toggle
  // display none
  position absolute
  bottom 0
  left 0
  right 0
  z-index 1102
  width 100%
  height 24px
  border-top solid 1px #ebebeb
  cursor pointer
  text-align center
  line-height 24px
  font-size 12px
  color #ccc
  transition background .3s
  background #fff
  overflow hidden
  i
    font-size 24px
    line-height 24px
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
  .doc-demo-box-preview-box
    width 100% !important
  .doc-demo-box-code
    position static
    float left
    width 100%
    border-left none !important
</style>

