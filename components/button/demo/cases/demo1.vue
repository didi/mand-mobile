<template>
  <div class="md-example-child md-example-child-button md-example-child-button-1">
    <md-button type="default" plain>Default</md-button>
    <md-button type="primary" plain>Primary</md-button>
    <md-button type="warning" plain>Warning</md-button>
    <md-button type="disabled" plain>Disabled</md-button>
  </div>
</template>

<script>import {Button} from 'mand-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '线性按钮',
  titleEnUS: 'Plain buttons',
  codeSandBox: 'https://codesandbox.io/s/m398mjvx89',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}
</script>

