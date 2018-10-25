<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-0">
    <md-tip content="不错哟" placement="top">
      <md-button type="default" size="small">点击我</md-button>
    </md-tip>
  </div>
</template>

<script>import {Tip, Button} from 'mand-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '上方',
  titleEnUS: 'Top',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>
