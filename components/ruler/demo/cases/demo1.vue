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
  name: 'ruler-demo',
  title: '最大1800，最小1200',
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
