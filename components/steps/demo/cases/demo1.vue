<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-1">
    <md-steps
      :steps="steps">
    </md-steps>
  </div>
</template>

<script>
import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '四个步骤',
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