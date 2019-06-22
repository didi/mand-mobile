<template>
  <div class="md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-0">
    <md-button @click="toggleKeyboard(0)">{{ isKeyBoardShow[0] ? '收起键盘' : '唤起键盘，有小数点' }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow[0]"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>

    <md-button @click="toggleKeyboard(1)">{{ isKeyBoardShow[1] ? '收起键盘' : '唤起键盘，无小数点' }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow[1]"
      hide-dot
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>

    <md-button @click="toggleKeyboard(2)">{{ isKeyBoardShow[2] ? '收起键盘' : '唤起键盘，替换键值' }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow[2]"
      :text-render="keyFormatter"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>
    <div class="md-example-display" v-show="isKeyBoardShow" v-text="number"></div>
  </div>
</template>

<script>import {NumberKeyboard, Button} from 'mand-mobile'

export default {
  name: 'number-keyboard-demo',
  /* DELETE */
  describe: '有确认键和小数点，一般用于价格或金额输入',
  describeEnUS: 'With confirmation key and decimal point, generally used for price or amount input',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  data() {
    return {
      isKeyBoardShow: [],
      number: '',
    }
  },
  methods: {
    toggleKeyboard(index) {
      this.$set(this.isKeyBoardShow, index, !this.isKeyBoardShow[index])
    },
    keyFormatter(val) {
      if (val === '.') {
        return 'x'
      }
    },
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

<style lang="stylus">
.md-example-child-number-keyboard-0
  .md-button
    margin-bottom 10px
  .md-example-display
    position fixed
    top 30%
    left 50%
    z-index 9999
    transform translate(-50%, -50%)
    font-size 120px
    text-shadow 0 4px 20px #666
</style>
