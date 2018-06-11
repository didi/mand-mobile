<template>
  <div class="md-example-child md-example-child-button md-example-child-button-1">
    <md-button type="ghost">Ghost</md-button>
    <md-button type="ghost" disabled style="margin-left:5px">Ghost</md-button>
    <md-button type="ghost-primary" style="margin-left:5px">Ghost-P</md-button>
    <md-button type="ghost-primary" disabled style="margin-left:5px">Ghost-P</md-button>
  </div>
</template>

<script>import {Button} from 'mand-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '线性按钮',
  titleEnUS: 'Ghost buttons',
  codeSandBox: 'https://codesandbox.io/s/m398mjvx89',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}
</script>

