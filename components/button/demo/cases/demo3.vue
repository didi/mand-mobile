<template>
  <div class="md-example-child  md-example-child-button md-example-child-button-3">
    <div class="md-example-section">
      <md-button type="primary" icon="edit" inline>Inline Primary</md-button>
      <md-button type="primary" inline plain>Inline Plain</md-button>
    </div>
    <div class="md-example-section">
      <md-button type="warning" size="small" inline>Warning</md-button>
      <md-button type="disabled" size="small" inline>Disabled</md-button>
    </div>
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
  .md-example-section
    float left
    width 100%
    margin-bottom 10px
  .md-button
    float left
</style>
