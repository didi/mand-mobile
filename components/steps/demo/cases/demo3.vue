<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-3">
    <md-steps
      :steps="steps"
      :current="2">
    </md-steps>
  </div>
</template>

<script>import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '指定当前步骤',
  codeSandBox: 'https://codesandbox.io/s/zwvk8l3053',
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
    }
  },
}
</script>