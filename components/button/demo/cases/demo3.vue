<template>
  <div class="md-example-child  md-example-child-button md-example-child-button-3">
    <md-button type="primary" inline>Inline Primary</md-button>
    <md-button type="primary" inline plain>Inline Plain</md-button>
    <br>
    <md-button type="warning" size="small" inline>Warning</md-button>
    <md-button type="disabled" size="small" inline>Disabled</md-button>
  </div>
</template>

<script>import {Button} from 'mand-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '行内按钮',
  titleEnUS: 'Inline buttons',
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
