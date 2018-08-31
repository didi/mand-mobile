<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-3">
    <md-steps
      direction="vertical"
      :steps="steps"
      :current="1">
    </md-steps>
  </div>
</template>

<script>import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '纵向展示',
  titleEnUS: 'Specify the current step',
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
          description: '这是登录的描述',
        },
        {
          name: '开通',
          description: '这是开通的描述',
        },
        {
          name: '验证',
          description: '这是验证的描述',
        },
        {
          name: '成功',
          description: '这是成功的描述',
        },
      ],
    }
  },
}
</script>
