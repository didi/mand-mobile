<template>
  <div class="md-example-child  md-example-child-button md-example-child-button-3">
    <div class="md-example-box-content">每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。</div>
    <md-button type="link">阅读全文</md-button>
    <div class="md-example-box-content" style="margin-top:10px">希望你可以记住我，记住我这样活过，这样在你身边待过。</div>
    <md-button type="link" icon="hollow-plus">加入收藏</md-button>
    <div class="md-example-box-content" style="margin-top:10px">少年时我们追求激情，成熟后却迷恋平庸。在我们寻找、伤害、背离之后，还能一如既往地相信爱情，这是一种勇气。</div>
    <md-button type="link" disabled>评论</md-button>
  </div>
</template>

<script>import {Button} from 'mand-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '文字链接按钮',
  titleEnUS: 'Text link buttons',
  codeSandBox: 'https://codesandbox.io/s/7zy8yp8zy6',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}
</script>

<style lang="stylus" scoped>
.md-example-child-button-3
  .md-example-box-content
    float left
    width 100%
    padding 60px h-gap-lg
    color color-text-base
    font-size font-minor-large
    text-align left
    background color-bg-base
    box-sizing border-box
    line-height 1.5
    text-indent 2em
  .md-button
    float left
</style>
