<template>
  <div class="md-scroll-view-refresh">
    <md-activity-indicator-rolling
      :process="!isRefreshing ? process : undefined"
      :width="10"
      :color="rollerColor"
    ></md-activity-indicator-rolling>
    <p class="refresh-tip">{{ refreshTip }}</p>
  </div>
</template>

<script>import Roller from '../activity-indicator/roller'

export default {
  name: 'md-scroll-view-refresh',

  components: {
    [Roller.name]: Roller,
  },

  props: {
    scrollTop: {
      type: Number,
      default: 0,
    },
    isRefreshing: {
      type: Boolean,
      default: false,
    },
    isRefreshActive: {
      type: Boolean,
      default: false,
    },
    refreshText: {
      type: String,
      default: '下拉刷新',
    },
    refreshActiveText: {
      type: String,
      default: '释放刷新',
    },
    refreshingText: {
      type: String,
      default: '刷新中...',
    },
    rollerColor: {
      type: String,
      default: '#2F86F6',
    },
  },

  computed: {
    process() {
      /* istanbul ignore if */
      if (!this.$el || !this.scrollTop) {
        return +this.scrollTop
      }

      const refreshHeight = this.$el.clientHeight

      if (Math.abs(this.scrollTop) < refreshHeight / 2) {
        return 0
      }
      // first 1/3 is not included in progress
      return (Math.abs(this.scrollTop) - refreshHeight / 2) / (refreshHeight / 2)
    },
    refreshTip() {
      if (this.isRefreshing) {
        return this.refreshingText
      } else if (this.isRefreshActive) {
        return this.refreshActiveText
      } else {
        return this.refreshText
      }
    },
  },
}
</script>

<style lang="stylus">
.md-scroll-view-refresh
  display flex
  padding 50px 0
  justify-content center
  align-items center
  overflow hidden
  .md-activity-indicator-rolling
    .md-activity-indicator-svg
      width 32px !important
      height 32px !important
      transform rotateZ(-45deg)
  .refresh-tip
    margin-left 15px
    font-size 24px
    color #999
</style>
