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
      ></md-input-item>
      <md-input-item
        ref="input11"
        placeholder="left/right slots"
      >
        <md-icon name="bank-zs" slot="left" svg></md-icon>
        <md-icon name="info" slot="right"></md-icon>
      </md-input-item>
    </md-field>
  </div>
</template>

<script>import {InputItem, Field, Icon} from 'mand-mobile'
import '@examples/assets/images/bank-zs.svg'

export default {
  name: 'input-item-demo',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Icon.name]: Icon,
  },
}
</script>

<style lang="stylus">
.md-example-child-input-item-2
  .md-number-keyboard .md-popup-box
    max-width 720px
</style>
