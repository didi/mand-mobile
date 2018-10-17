<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-0">
    <md-steps :steps="steps"></md-steps>
  </div>
</template>

<script>import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  codeSandBox: 'https://codesandbox.io/s/38zp7vq22m',
  height: 150,
  /* DELETE */
  components: {
    [Steps.name]: Steps,
  },
  data() {
    return {
      steps: [
        {
          name: '登录/注册',
        },
        {
          name: '申请征信报告',
        },
        {
          name: '提取征信报告',
        },
      ],
    }
  },
}
</script>