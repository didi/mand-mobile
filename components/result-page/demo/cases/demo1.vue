<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-1">
    <md-result-page
      type="network"
      subtext="点击屏幕，重新加载">
    </md-result-page>
  </div>
</template>

<script>import {ResultPage} from 'mand-mobile'

export default {
  name: 'result-page-demo',
  title: '网络异常',
  components: {
    [ResultPage.name]: ResultPage,
  },
}
</script>

<style lang="stylus">
.md-result-page.customized
  img
    height 131px
</style>