<template>
  <div class="md-example-child md-example-child-single-component">
    <p>当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        :scope="scope"
        :step="100"
        :unit="10"
        :max="1800"
        :min="1200"
        v-model="value"
      ></md-ruler>
    </div>
  </div>
</template>

<script>import {Ruler} from 'mand-mobile'

export default {
  name: 'ruler-demo-1',
  /* DELETE */
  title: '最大1800，最小1200',
  titleEnUS: 'Max 1800, Min 1200',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [Ruler.name]: Ruler,
  },
  data() {
    return {
      value: 1305,
      scope: [1000, 2000],
    }
  },
}
</script>

<style lang="stylus" scoped>
  .md-example-child-single-component
    .container
      margin 0 auto
      width 640px
</style>
