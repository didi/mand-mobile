<template>
  <div class="md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-0">
    <md-button @click="isKeyBoardShow = !isKeyBoardShow">{{ isKeyBoardShow ? '收起键盘' : '唤起键盘' }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>
    <div class="md-example-display" v-show="isKeyBoardShow" v-text="number"></div>
  </div>
</template>

<script>
import {NumberKeyboard, Button} from 'mand-mobile'

export default {
  name: 'number-keyboard-demo',
  /* DELETE */
  title: '基本',
  describe: '有确认键和小数点，一般用于价格或金额输入',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  data() {
    return {
      isKeyBoardShow: false,
      number: '',
    }
  },
  methods: {
    onNumberEnter(val) {
      this.number += val
    },
    onNumberDelete() {
      if (this.number === '') {
        return
      }
      this.number = this.number.substr(0, this.number.length - 1)
    },
  },
}

</script>

<style lang="stylus" scoped>
.md-example-display
  position fixed
  top 30%
  left 50%
  z-index 9999
  transform translate(-50%, -50%)
  font-size font-heading-large * 2
  text-shadow 0 4px 20px color-text-minor
</style>
