<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-2">
    <md-result-page :buttons="buttons"></md-result-page>
  </div>
</template>

<script>import {ResultPage, Toast} from 'mand-mobile'

export default {
  name: 'result-page-demo',
  /* DELETE */
  title: '按钮',
  titleEnUS: 'With button',
  /* DELETE */
  components: {
    [ResultPage.name]: ResultPage,
  },
  data() {
    return {
      buttons: [
        {
          text: '普通按钮',
          handler() {
            Toast.succeed('普通操作')
          },
        },
        {
          text: '高亮按钮',
          type: 'primary',
          handler() {
            Toast.succeed('不普通操作')
          },
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
.md-example-child-result-page-2
  background #FFF
</style>