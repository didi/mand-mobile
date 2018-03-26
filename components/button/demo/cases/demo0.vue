<template>
  <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button>Primary</md-button>
    <md-button disabled>Primary Disabled</md-button>
  </div>
</template>

<script>import {Button} from 'mand-mobile'

export default {
  name: 'button-demo',
  title: '主按钮',
  components: {
    [Button.name]: Button,
  },
}
</script>

