<template>
  <div class="md-example-child md-example-child-input-item-1">
    <md-field>
      <md-input-item
        ref="name"
        preview-type="text"
        value="张**"
        title="真实姓名"
        placeholder="投保人姓名"
        is-title-latent
      ></md-input-item>
      <md-input-item
        ref="id"
        type="bankCard"
        preview-type="text"
        value="6222 **** **** 1234"
        title="银行卡号"
        placeholder="投保人银行卡号"
        is-title-latent
        is-virtual-keyboard
        ></md-input-item>
    </md-field>
  </div>
</template>

<script>import {InputItem, Field} from 'mand-mobile'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '标题浮动输入框',
  titleEnUS: 'Floating title input',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
}
</script>

<style lang="stylus">
.md-example-child-input-item-1
  .md-field
    padding-bottom 40px
</style>
