<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-3">
    <md-steps
      :steps="steps"
      :current="current"
    >
    </md-steps>
  </div>
</template>

<script>import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
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
      current: 0,
    }
  },
  mounted() {
    this.current = 2
  },
}
</script>