<template>
  <div class="wrapper0">
    <div class="wrapper1" scroll-wrapper>
      <md-tip content="不错哟" placement="top" ref="tip">
        <md-button type="default">点击我</md-button>
      </md-tip>
    </div>
  </div>
</template>

<script>import Button from '../../button'
import Tip from '../index'
export default {
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
}
</script>>  