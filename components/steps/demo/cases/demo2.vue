<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-2">
    <md-steps
      :steps="steps"
      :current="2">
      <div slot="reached" slot-scope="props">
        <!-- props.index -->
        <md-icon name="checked" size="lg"></md-icon>
      </div>
      <div slot="current" slot-scope="props">
        <!-- props.index -->
        <md-icon name="check" size="lg"></md-icon>
      </div>
    </md-steps>
  </div>
</template>

<script>import {Steps, Icon} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '自定义步骤图标',
  titleEnUS: 'Custom step icon',
  codeSandBox: 'https://codesandbox.io/s/9jz3y30wow',
  height: 150,
  /* DELETE */
  components: {
    [Steps.name]: Steps,
    [Icon.name]: Icon,
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