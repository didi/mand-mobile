<template>
  <div class="wrapper0">
    <div class="wrapper1" scroll-wrapper>
      <md-tip content="不错哟" placement="top" ref="tip">
        <span>点击我</span>
      </md-tip>
    </div>
  </div>
</template>

<script>
import Tip from '../index'
export default {
  components: {
    [Tip.name]: Tip
  },
}

</script>