<template>
  <div class="md-example-child md-example-child-md-activity-indicator md-example-child-md-activity-indicator-2">
    <md-activity-indicator
      type="carousel"
      :size="15"
    ></md-activity-indicator>
    <md-button type="primary" @click="createPay">
      <md-activity-indicator
        v-if="loading"
        class="md-activity-indicator-css"
        type="carousel"
        :size="15"
        color="#fff"
        text-color="#fff"
      ></md-activity-indicator>
      <span v-else>确认支付</span>
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
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    createPay() {
      if (this.loading) {
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
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
    width 100%
    .md-activity-indicator-css
      margin-bottom 0
      .md-activity-indicator-svg
        height 15px !important
</style>