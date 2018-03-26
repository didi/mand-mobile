<template>
  <div class="md-notice-bar" v-if="isShow">
    <template>
      <md-icon :name="icon" class="md-notice-icon md-notice-icon-left"></md-icon>
    </template>
    <slot></slot>
    <template v-if="closable">
      <md-icon name="cross" class="md-notice-icon md-notice-icon-right" @click.native="$_close"></md-icon>
    </template>
  </div>
</template>

<script>import Icon from '../icon'
export default {
  name: 'md-notice-bar',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    closable: {
      type: Boolean,
      default: true,
    },
    time: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: 'circle-alert',
    },
  },

  data() {
    return {
      isShow: true,
    }
  },

  mounted() {
    if (this.time) {
      this.$_hide(this.time)
    }
  },

  methods: {
    // MARK: private methods
    $_hide(time) {
      setTimeout(() => {
        this.isShow = false
      }, time)
    },
    $_close() {
      this.isShow = false
    },
  },
}
</script>

<style lang="stylus">
.md-notice-bar
  font-size font-minor-large
  height 75px
  line-height 75px
  background-color #4A4C5B
  color color-bg-base
  position relative
  padding-left 80px
  .md-notice-icon
    position absolute
    top 50%
    transform translateY(-50%)
    &.md-notice-icon-left
      left 32px
    &.md-notice-icon-right
      right 32px
</style>
