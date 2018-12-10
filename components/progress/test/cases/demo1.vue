<template>
  <div class="md-example-child md-example-child-progress">
    <md-progress
      :value="0.8"
      :width="10"
      :size="100"
      color="url(#linear)"
      border-color="#FFF"
      linecap="butt"
    >
      <span class="progress-value">80%</span>
      <defs slot="defs">
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#FF5257"/>
          <stop offset="100%" stop-color="#FFC541D6"/>
        </linearGradient>
      </defs>
    </md-progress>
    <md-progress
      :value="0.8"
      :width="10"
      :size="100"
      color="#FF5257"
      transition
    >
      <span class="progress-value">
        <md-amount
          :value="80"
          :precision="0"
          transition
        ></md-amount>%
      </span>
    </md-progress>
  </div>
</template>

<script>import {Amount, Progress} from 'mand-mobile'

export default {
  name: 'progress-demo',
  /* DELETE */
  title: '其他配置',
  titleEnUS: 'Other configurations',
  /* DELETE */
  components: {
    [Amount.name]: Amount,
    [Progress.name]: Progress,
  },
}
</script>

<style lang="stylus">
.md-example-child-progress
  display flex
  justify-content center
  .md-progress
    margin 0 10px
  .progress-value
    font-size 24px
    font-family DINPro-Medium
</style>
