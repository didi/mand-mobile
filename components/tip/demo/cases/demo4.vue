<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-4">
    <md-tip content="不错哟" @show="onShow" @hide="onHide">
      <md-button type="ghost" size="small">点击我</md-button>
    </md-tip>
  </div>
</template>

<script>import {Tip, Button, Toast} from 'mand-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '事件',
  titleEnUS: 'Event',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
  methods: {
    onShow() {
      Toast({
        content: '显示了',
      })
    },
    onHide() {
      Toast({
        content: '隐藏了',
      })
    },
  },
}
</script>
