<template>
  <div class="md-example-child md-example-child-captcha-1">
    <md-captcha
      :maxlength="4"
      :isView="true"
      brief="最新验证码依然有效，请勿重发"
    >
      验证码已发送至186****5407
    </md-captcha>
  </div>
</template>

<script>import {Captcha} from 'mand-mobile'

export default {
  name: 'captcha-demo',
  /* DELETE */
  title: '内联',
  titleEnUS: 'Inline display',
  height: 650,
  /* DELETE */
  components: {
    [Captcha.name]: Captcha,
  },
}
</script>

<style lang="stylus">
.md-example-child-captcha-1
  height 650px
  padding 30px 0
  .md-number-keyboard
    margin-top 30px
</style>
