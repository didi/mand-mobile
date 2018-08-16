<template>
  <div class="md-example-child md-example-child-field md-example-child-field-3">
    <md-field
      title="收款账户"
      plain
    >
      <div
        class="field-title-value"
        slot="titleValue"
      >
        <md-icon name="bank-zs"></md-icon>&nbsp;招商银行(尾号xxxx)
      </div>
      <div>
        <md-field-item
          title="借款金额"
          value="￥30,000"
          align="right"
        ></md-field-item>
        <md-field-item
          title="借款期数"
          value="12期"
          align="right"
        ></md-field-item>
        <md-field-item
          title="正常还款总息"
          value="￥140.50"
          align="right"
        ></md-field-item>
      </div>
    </md-field>
  </div>
</template>

<script>import {Field, FieldItem, Icon} from 'mand-mobile'

export default {
  name: 'field-demo',
  /* DELETE */
  title: '纯文列表',
  titleEnUS: 'Plain text items',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
  },
}
</script>

<style lang="stylus">
.md-example-child-field-3
  .md-field
    margin-bottom 20px
    .field-title-value
      display flex
      align-items center
      justify-content flex-end
  .md-input-item
    background #FFF
    padding 0 32px
  .strong-tip
    font-size 24px
    color color-text-highlight
</style>