<template>
  <div class="md-example-child md-example-child-input-item-4">
    <md-field>
      <md-input-item
        ref="input9"
        title="清空按钮"
        placeholder="normal text"
        clearable
      ></md-input-item>
      <md-input-item
        ref="input10"
        title="金融键盘"
        placeholder="financial number keyboard"
        is-virtual-keyboard
        clearable
        @focus="onFakeInputFocus"
        @blur="onFakeInputBlur"
      ></md-input-item>
      <md-input-item
        ref="input11"
        placeholder="left/right slots"
      >
        <md-icon name="bank-zs" slot="left" svg></md-icon>
        <md-icon name="info" slot="right" @click.native="onClick"></md-icon>
      </md-input-item>
    </md-field>
  </div>
</template>

<script>import {InputItem, Field, Icon, Toast} from 'mand-mobile'
import '@examples/assets/images/bank-zs.svg'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '表单控件',
  titleEnUS: 'input with controls',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Icon.name]: Icon,
  },
  methods: {
    onClick() {
      Toast({
        content: 'some information',
        icon: 'warn',
      })
    },
    onFakeInputFocus() {
      console.log('xxxxxxx')
      function getElementPosition(element) {
        const defaultRect = {top: 0, left: 0}
        const rect = element
          ? (element.getBoundingClientRect && element.getBoundingClientRect()) || defaultRect
          : defaultRect
        const ret = {
          top: rect.top,
          left: rect.left,
        }
        return ret
      }

      setTimeout(() => {
        const wrapper = this.$el
        const inputer = this.$refs['input10']
        const inputEl = inputer.$el
        const keyboardEl = document
          .querySelector(`#${inputer.name}-number-keyboard`)
          .querySelector('.md-number-keyboard-container')
        const offset =
          keyboardEl.clientHeight +
          inputEl.clientHeight -
          document.documentElement.clientHeight +
          getElementPosition(inputEl).top +
          30

        const oldPaddingBottom = +wrapper.style.paddingBottom.replace(/px|rem|em/gi, '')
        const oldScrollTop = document.body.scrollTop
        const newPaddingBottom = oldPaddingBottom + offset
        const newScrollTop = oldScrollTop + offset

        wrapper.style.paddingBottom = `${newPaddingBottom}px`
        document.body.scrollTop = newScrollTop

        this.scrollInputBack = () => {
          wrapper.style.paddingBottom = `${oldPaddingBottom}px`
          document.body.scrollTop = oldScrollTop
          this.scrollInputBack = null
        }
      }, 300)
    },
    onFakeInputBlur() {
      this.scrollInputBack && this.scrollInputBack()
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-input-item-2
  .md-number-keyboard .md-popup-box
    max-width 720px
</style>
