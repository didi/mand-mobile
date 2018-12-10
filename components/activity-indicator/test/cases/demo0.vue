<template>
  <div class="md-example-child md-example-child-md-activity-indicator md-example-child-md-activity-indicator-0">
    <md-activity-indicator
      :size="20"
      :text-size="16"
    >加载中...</md-activity-indicator>
    <md-activity-indicator
      :size="20"
      :text-size="16"
      vertical
    >vertical loading</md-activity-indicator>
    <md-activity-indicator
      class="md-activity-indicator-css"
    >loading...</md-activity-indicator>
	</div>
</template>

<script>import {ActivityIndicator} from 'mand-mobile'

export default {
  name: 'activity-indicator-demo',
  title: 'Roller',
  components: {
    [ActivityIndicator.name]: ActivityIndicator,
  },
}
</script>

<style lang="stylus">
.md-example-child-md-activity-indicator-0
  display flex
  flex-direction column
  align-items center
  .md-activity-indicator
    margin-bottom 30px
    &.md-activity-indicator-css
      .md-activity-indicator-svg
        width 60px !important
        height 60px !important
      .md-activity-indicator-text
        font-size 32px
</style>