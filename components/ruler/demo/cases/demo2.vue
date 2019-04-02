<template>
  <div class="md-example-child md-example-child-single-component">
    <p>当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        :scope="scope"
        :step="100"
        :unit="10"
        :max="2000"
        :min="1000"
        v-model="value"
      ></md-ruler>
    </div>
  </div>
</template>

<script>import {Ruler} from 'mand-mobile'

export default {
  name: 'ruler-demo',
  /* DELETE */
  title: '触发 <a href="javascript:window.triggerRuler2()">Change to 1500</a>',
  titleEnUS: 'trigger <a href="javascript:window.triggerRuler2()">Change to 1500</a>',
  describe: '只在滚动停止时有效',
  describeEnUS: 'only valid when scroll is stopped',
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
  mounted() {
    window.triggerRuler2 = () => {
      this.value = 1500
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
