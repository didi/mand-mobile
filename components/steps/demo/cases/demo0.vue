<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-0">
    <md-steps
      :steps="steps">
    </md-steps>
  </div>
</template>

<script>import {Steps} from 'mand-mobile'

export default {
  name: 'steps-demo',
  title: '三个步骤',
  height: 150,
  components: {
    [Steps.name]: Steps,
  },
  data() {
    return {
      steps: [
        {
          name: '开通理财账户',
        },
        {
          name: '验证手机号',
        },
        {
          name: '开通成功',
        },
      ],
    }
  },
}
</script>