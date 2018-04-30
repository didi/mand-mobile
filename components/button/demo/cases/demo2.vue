<template>
  <div class="md-example-child md-example-child-button md-example-child-button-2">
    <md-button type="ghost" size="small">Ghost-S</md-button>
    <md-button type="ghost" size="small" disabled style="margin-left:5px">Ghost-S</md-button>
    <md-button type="ghost-primary" size="small" style="margin-left:5px">Ghost-P-S</md-button>
    <md-button type="ghost-primary" size="small" disabled style="margin-left:5px">Ghost-P-S</md-button>
  </div>
</template>

<script>import {Button} from 'mand-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '线性按钮小尺寸',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}
</script>

