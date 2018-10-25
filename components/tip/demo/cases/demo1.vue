<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-1">
    <md-tip content="不错哟" placement="bottom">
      <md-button type="default" size="small">点击我</md-button>
    </md-tip>
  </div>
</template>

<script>import {Tip, Button} from 'mand-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '下方',
  titleEnUS: 'Bottom',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>
