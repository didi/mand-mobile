<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-4">
    <md-notice-bar
      icon="warn"
      type="warning"
    >
      为了确保您的资金安全，请设置支付密码。
    </md-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from 'mand-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '样式',
  titleEnUS: 'Theme',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
