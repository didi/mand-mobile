<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-2">
    <md-tip content="不错哟" placement="left">
      <md-button type="ghost" size="small">点击我</md-button>
    </md-tip>
  </div>
</template>

<script>import {Tip, Button} from 'mand-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '左侧',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>