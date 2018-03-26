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
  title: '指定当前步骤',
  height: 150,
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