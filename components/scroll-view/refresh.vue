<template>
  <div class="md-scroll-view-refresh">
    <md-activity-indicator-rolling
      :process="!isRefreshing ? process : undefined"
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
    scrollY: {
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
      default: '释放即可刷新',
    },
    refreshingText: {
      type: String,
      default: '刷新中...',
    },
  },

  computed: {
    process() {
      if (!this.$el || !this.scrollY) {
        return +this.scrollY
      }
      return Math.abs(this.scrollY) / 70
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
  .refresh-tip
    margin-left 15px
    font-size 28px
    color #999
</style>
