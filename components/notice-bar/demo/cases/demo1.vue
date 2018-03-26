<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-1">
    <md-notice-bar
      :closable="false"
      icon="right"
    >
      为了确保您的资金安全，请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from 'mand-mobile'

export default {
  name: 'notice-bar-demo',
  title: '设置图标',
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
