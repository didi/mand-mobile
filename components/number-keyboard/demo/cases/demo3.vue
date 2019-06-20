<template>
  <div class="md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-3">
    <md-button @click="isKeyBoardShow = !isKeyBoardShow">{{ isKeyBoardShow ? '收起键盘' : '唤起键盘' }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow"
      ok-text="支付"
      disorder
    >
      <p class="number-keyboard-header">
        <md-icon name="security"></md-icon>&nbsp;安全支付
      </p>
    </md-number-keyboard>
  </div>
</template>

<script>import {NumberKeyboard, Button, Icon} from 'mand-mobile'

export default {
  name: 'number-keyboard-demo',
  /* DELETE */
  title: '插槽',
  titleEnUS: 'Slots',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  data() {
    return {
      isKeyBoardShow: false,
    }
  },
}
</script>

<style lang="stylus" scoped>
.number-keyboard-header
  display flex
  align-items center
  justify-content center
  padding 10px 0
  font-size 14px
  color #999
</style>
