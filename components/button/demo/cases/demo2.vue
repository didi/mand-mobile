<template>
  <div class="md-example-child md-example-child-button md-example-child-button-2">
    <md-button type="default" round>Default & Round</md-button>
    <md-button type="primary" round>Primary & Round</md-button>
    <md-button type="warning" round>Warning & Round</md-button>
    <md-button type="disabled" round>Disabled & Round</md-button>
  </div>
</template>

<script>import {Button} from 'mand-mobile'

export default {
  name: 'button-demo',
  /* DELETE */
  title: '圆角按钮',
  titleEnUS: 'Round Buttons',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
}
</script>

