<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-7">
    <md-notice-bar
      mode="closable"
      icon="volumn"
      auto-scroll
    >
      为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。
    </md-notice-bar>
    <br />
    <md-notice-bar
      mode="closable"
      icon="volumn"
      auto-scroll
      :animation-duration="8000"
    >
      请设置支付密码
    </md-notice-bar>
  </div>
</template>

<script>import {NoticeBar} from 'mand-mobile'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '自动滚动播放(不关心内容是否超出)',
  titleEnUS: 'Scroll play',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>
