<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-4">
    <md-steps
      :steps="steps"
      :current="currentStep"
      transition
    >
    </md-steps>
  </div>
</template>

<script>import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '进度变化动效 <a href="javascript:window.triggerSteps0()">current = 2</a>',
  titleEnUS: 'Dynamically modify the current step <a href="javascript:window.triggerSteps0()">current = 2</a>',
  codeSandBox: 'https://codesandbox.io/s/wmz776wq5',
  height: 150,
  /* DELETE */
  components: {
    [Steps.name]: Steps,
  },
  mounted() {
    window.triggerSteps0 = () => {
      this.currentStep = 1.5
    }
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
      currentStep: 0,
    }
  },
}
</script>
