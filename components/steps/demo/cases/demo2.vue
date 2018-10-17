<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-2">
    <md-steps
      :steps="steps"
      :current="2"
    >
      <template slot="reached" slot-scope="props">
        <!-- props.index -->
        <md-icon name="checked" v-if="props.index === 1"></md-icon>
        <div class="step-node-default" v-else></div>
      </template>
      <template slot="current" slot-scope="props">
        <md-icon name="location"></md-icon>
      </template>
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