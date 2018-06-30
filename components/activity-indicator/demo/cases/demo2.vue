<template>
  <div class="md-example-child md-example-child-md-activity-indicator md-example-child-md-activity-indicator-2">
    <md-activity-indicator
      type="carousel"
      :size="15"
    ></md-activity-indicator>
    <md-button>
      <md-activity-indicator
        class="md-activity-indicator-css"
        type="carousel"
        :size="15"
        color="#fff"
        text-color="#fff"
      >正在支付</md-activity-indicator>
    </md-button>
	</div>
</template>

<script>import {ActivityIndicator, Button} from 'mand-mobile'

export default {
  name: 'activity-indicator-demo',
  title: 'Carousel',
  components: {
    [ActivityIndicator.name]: ActivityIndicator,
    [Button.name]: Button,
  },
}
</script>

<style lang="stylus">
.md-example-child-md-activity-indicator-2
  display flex
  flex-direction column
  align-items center
  .md-activity-indicator
    margin-bottom 30px
  .md-button
    .md-activity-indicator-css
      margin-bottom 0
      .md-activity-indicator-svg
        height 15px !important
</style>