<template>
  <div class="md-example-child md-example-child-button md-example-child-button-2">
    <md-button type="default" round>Default</md-button>
    <md-button type="primary" round>Primary</md-button>
    <md-button type="warning" round>Warning</md-button>
    <md-button type="disabled" round>Disabled</md-button>
  </div>
</template>

<script>import {Button} from 'mand-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '圆角按钮',
  titleEnUS: 'Round Buttons',
  codeSandBox: 'https://codesandbox.io/s/jlv69qoq8v',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}
</script>

