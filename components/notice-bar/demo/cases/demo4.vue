<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-1">
    <md-notice-bar
      mode="link"
      icon="security"
      multi-rows
    >
      为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。
    </md-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from 'mand-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '多行显示',
  titleEnUS: 'With icon',
  codeSandBox: 'https://codesandbox.io/s/53zlz1nj24',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
