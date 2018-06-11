<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-5">
    <md-steps
      :steps="steps"
      :current="currentStep">
    </md-steps>
  </div>
</template>

<script>import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '利用current类增加自定义样式',
  titleEnUS: 'Add custom styles through by class named "current"',
  codeSandBox: 'https://codesandbox.io/s/po5847q2j',
  height: 150,
  /* DELETE */
  components: {
    [Steps.name]: Steps,
  },
  data() {
    return {
      steps: [
        {
          name: '登录',
        },
        {
          name: '开通',
        },
        {
          name: '验证',
        },
        {
          name: '成功',
        },
      ],
      currentStep: 1,
    }
  },
}
</script>

<style lang="stylus">
.md-example-child-steps-5
  height 140px
  .md-steps .icon.current::before
    content ''
    color color-primary-tap
    border-bottom 10px solid
    border-left 10px solid transparent
    border-right 10px solid transparent
    position absolute
    top 130px
</style>
