<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-1">
    <md-notice-bar>
      <md-icon slot="left" class="md-notice-demo-icon md-notice-demo-icon-left" name="circle-alert"></md-icon>
      为了确保您的资金安全，请设置支付密码。
    </md-notice-bar>
  </div>
</template>

<script>import {NoticeBar, Icon} from 'mand-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '自定义',
  titleEnUS: 'With icon',
  codeSandBox: 'https://codesandbox.io/s/53zlz1nj24',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: Icon,
  },
}
</script>
