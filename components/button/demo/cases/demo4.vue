<template>
  <div class="md-example-child  md-example-child-button md-example-child-button-3">
    <md-button type="link" icon="message">评论</md-button>
    <md-button type="link" inactive>去看看<md-icon name="arrow" size="md"></md-icon></md-button>
  </div>
</template>

<script>import {Button, Icon} from 'mand-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '文字链接按钮',
  titleEnUS: 'Text link buttons',
  align: 'right',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
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
