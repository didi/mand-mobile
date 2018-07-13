<template>
  <div class="mfe-blog-theme-default-preview">
    <div class="preview-category">
      <div class="preview-category-title"><i class="icon-hollow-money"></i>Financial Components</div>
      <div class="preview-category-list">
        <template v-for="(category, i) in components">
          <template v-for="(component, j) in category.menu">
            <div class="preview-category-item" :key="`financial-${i}-${j}`" v-if="~financialComponents.indexOf(component.name)">
              <router-link :to="`/${lang}/docs/components/${category.name}/${component.name}`">
                <div class="preview-category-item-img">
                  <img :src="`//manhattan.didistatic.com/static/manhattan/mand/preview/${component.name}.jpg`" :alt="component.name">
                </div>
                <div
                  v-if="lang === 'zh-CN'"
                  class="preview-category-item-title"
                  v-html="component.text">
                </div>
                <div
                  v-else
                  class="preview-category-item-title"
                  v-html="component.name">
                </div>
              </router-link>
            </div>
          </template>
        </template>
      </div>
    </div>
    <template v-for="(category, i) in components">
      <div class="preview-category" :key="`category-${i}`">
        <div class="preview-category-title" v-text="category.text"></div>
        <div class="preview-category-list">
          <template v-for="(component, j) in category.menu">
            <div class="preview-category-item" :key="`item-${j}`">
              <router-link :to="`/${lang}/docs/components/${category.name}/${component.name}`">
                <div class="preview-category-item-img">
                  <img :src="`//manhattan.didistatic.com/static/manhattan/mand/preview/${component.name}.jpg`" :alt="component.name">
                </div>
                <div
                  v-if="lang === 'zh-CN'"
                  class="preview-category-item-title"
                  v-html="component.text">
                </div>
                <div
                  v-else
                  class="preview-category-item-title"
                  v-html="component.name">
                </div>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'mfe-blog-theme-default-home',
  data () {
    return {
      financialComponents: ['amount', 'captcha', 'cashier', 'chart', 'codebox', 'input-item', 'number-keyboard']
    }
  },
  computed: {
    components () {
      return window.mbConfig.components
    },
    lang() {
      return ~this.$route.path.indexOf('zh-CN') ? 'zh-CN' : 'en-US'
    },
  }
}
</script>

<style lang="stylus" scoped>
block()
  float left
  width 100%
.mfe-blog-theme-default-preview
  padding 0 32px
  border-left solid 1px #ebedee
  .preview-category-title
    padding-left 10px
    font-size 20px
    i
      margin-right 10px
      color #e6c266
  .preview-category-list
    clearfix()
    margin-bottom 30px
    .preview-category-item
      float left
      width 25%
      padding 10px
      box-sizing border-box
      a
        block()
        border solid 1px #ebedee
        border-radius 6px
        transition box-shadow .3s
        &:hover
          box-shadow 0 0 8px rgba(0, 0, 0, 0.08)
        
        .preview-category-item-img
          block()
          height 180px
          padding 0 10px
          box-sizing border-box
          overflow hidden
          img
            position relative
            left 50%
            top 50%
            width 100%
            height auto
            transform translate(-50%, -50%)
    
        .preview-category-item-title
          block()
          height 40px
          line-height 40px
          text-align center
          border-top solid 1px #ebedee
          color #314659
</style>
