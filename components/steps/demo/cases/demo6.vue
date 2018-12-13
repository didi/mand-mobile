<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-6">
    <md-steps
      :steps="steps"
      :current="currentStep"
    >
    </md-steps>
  </div>
</template>

<script>import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '完成全部步骤',
  titleEnUS: 'Complete all steps',
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
      currentStep: 4,
    }
  },
}
</script>
