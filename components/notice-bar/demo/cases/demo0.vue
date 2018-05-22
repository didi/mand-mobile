<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-0">
    <md-notice-bar>为了确保您的资金安全，请设置支付密码</md-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from 'mand-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '基本',
  codeSandBox: 'https://codesandbox.io/s/xl4wrl0194',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>