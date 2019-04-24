<template>
  <div class="md-example-child md-example-child-single-component">
    <p>当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        v-model="value"
        :scope="scope"
        :step="100"
        :unit="10"
        :step-text-render="stepTextRender"
      ></md-ruler>
    </div>
  </div>
</template>

<script>import {Ruler} from 'mand-mobile'

export default {
  name: 'ruler-demo',
  /* DELETE */
  title: '自定义step展示文案',
  titleEnUS: 'Custom step text',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [Ruler.name]: Ruler,
  },
  data() {
    return {
      value: 1300,
      scope: [1000, 2000],
    }
  },
  methods: {
    stepTextRender(step) {
      return step + 'cm'
    },
  },
}
</script>

<style lang="stylus" scoped>
  .md-example-child-single-component
    .container
      margin 0 auto
      width 640px
</style>
