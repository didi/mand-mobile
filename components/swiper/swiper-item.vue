<template>
  <div
    class="md-swiper-item" 
    :style="{'width': swiperWidth, 'height': swiperHeight }">
    <slot></slot>
  </div>
</template>

<script>export default {
  name: 'md-swiper-item',

  // components: {
  // },

  // props: {
  // },

  // data () {
  //   return {
  //   }
  // },

  computed: {
    swiperWidth() {
      return !this.$parent.isVertical ? `${this.$parent.dimension}px` : 'auto'
    },
    swiperHeight() {
      return this.$parent.isVertical ? `${this.$parent.dimension}px` : 'auto'
    },
  },

  // watch: {
  // },

  // LiftCircle Hook
  /*
  beforeCreate
  created
  beforeMount
  */
  mounted() {
    return this.$parent && this.$parent.swiperItemCreated(this)
  },
  /*
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  */
  destroyed() {
    return this.$parent && this.$parent.swiperItemDestroyed(this)
  },
  /*
  errorCaptured
   */

  // methods: {
  // }
}
</script>

<style lang="stylus">
  .md-swiper-item
    position relative
    width 100%
    flex-shrink 0
</style>
