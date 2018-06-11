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
  /* DELETE */
  title: '三个步骤',
  titleEnUS: 'Three steps',
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