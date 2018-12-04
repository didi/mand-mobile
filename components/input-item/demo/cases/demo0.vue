<template>
  <div class="md-example-child md-example-child-input-item-0">
    <md-field>
      <md-input-item
        ref="input0"
        title="普通文本"
        placeholder="普通文本"
        is-amount
        :maxlength="5"
      ></md-input-item>
      <md-input-item
        ref="input1"
        title="禁用表单"
        value="禁用表单"
        disabled
      ></md-input-item>
      <md-input-item
        ref="input12"
        title="只读表单"
        value="只读表单"
        readonly
      ></md-input-item>
      <md-input-item
        ref="input13"
        title="高亮表单"
        placeholder="高亮表单"
        is-highlight
      ></md-input-item>
      <md-input-item
        ref="input3"
        title="文本居中"
        placeholder="文本居中"
        align="center"
      ></md-input-item>
      <md-input-item
        ref="input4"
        title="文本居右"
        placeholder="文本居右"
        align="right"
      ></md-input-item>
    </md-field>
  </div>
</template>

<script>import {InputItem, Field} from 'mand-mobile'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '普通输入框',
  titleEnUS: 'Normal input',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
}
</script>