<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-3">
    <md-tip content="点击拼车更有优惠，拼成还可能获得随机礼包" placement="right">
      <md-button type="ghost" size="small">点击我</md-button>
    </md-tip>
  </div>
</template>

<script>import {Tip, Button} from 'mand-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '右侧',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>
