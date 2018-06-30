<template>
  <div class="md-example-child md-example-child-md-activity-indicator md-example-child-md-activity-indicator-1">
    <md-activity-indicator
      type="spinner"
      :size="30"
      :text-size="20"
    >加载中...</md-activity-indicator>
    <div class="activity-indicator-container">
      <md-activity-indicator
        class="md-activity-indicator-css"
        type="spinner"
        :size="30"
        :text-size="20"
        color="light"
      >加载中...</md-activity-indicator>
    </div>
	</div>
</template>

<script>import {ActivityIndicator} from 'mand-mobile'

export default {
  name: 'activity-indicator-demo',
  title: 'Spinner',
  components: {
    [ActivityIndicator.name]: ActivityIndicator,
  },
}
</script>

<style lang="stylus">
.md-example-child-md-activity-indicator-1
  display flex
  flex-direction column
  align-items center
  .md-activity-indicator
    margin-bottom 30px
  .activity-indicator-container
    margin-bottom 30px
    padding 15px 20px
    background rgba(0, 0, 0, .7)
    border-radius 4px
    .md-activity-indicator-css
      margin-bottom 0
      .md-activity-indicator-svg
        width 40px !important
        height 40px !important
      .md-activity-indicator-text
        font-size 28px !important
</style>