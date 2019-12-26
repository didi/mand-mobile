<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-7">
    <md-notice-bar scrollable>
      <md-icon slot="left" class="md-notice-demo-icon md-notice-demo-icon-left" name="security"></md-icon>
      {{ content }}
    </md-notice-bar>
  </div>
</template>

<script>import {NoticeBar, Icon} from 'mand-mobile'
import {setTimeout} from 'timers'

export default {
  name: 'notice-bar-demo',
  /* DELETE */
  title: '动态插槽内容',
  titleEnUS: 'Dynamic slot content',
  background: '#fff',
  /* DELETE */
  components: {
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: Icon,
  },
  data() {
    return {
      content: '为了确保您的资金安全，请设置支付密码',
    }
  },
  mounted() {
    setTimeout(() => {
      this.content = '为了确保您的资金安全，请设置支付密码;为了确保您的资金安全，请设置支付密码'
    }, 2000)

    setTimeout(() => {
      this.content = '为了确保您的资金安全，请设置支付密码'
    }, 8000)
  },
}
</script>
