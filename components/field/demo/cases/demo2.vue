<template>
  <div class="md-example-child md-example-child-field md-example-child-field-2">
    <md-field>
      <md-field-item title="交通银行(尾号3089)" describe="展示摘要描述" />
      <md-field-item title="招商银行(尾号2342)" describe="展示摘要描述">
        <md-switch v-model="open" slot="after" />
      </md-field-item>
      <md-field-item title="交通银行(尾号3089)" describe="展示摘要描述" arrow>
        <span slot="after">附加文案</span>
      </md-field-item>
      <md-field-item title="交通银行" describe="展示摘要描述" arrow>
        <span class="holder" slot="start"></span>
        <span slot="after">附加文案</span>
      </md-field-item>
      <md-field-item title="招商银行" describe="展示摘要描述" disabled arrow>
        <span class="holder" slot="start"></span>
        <span slot="after">禁用的项目</span>
      </md-field-item>
      <md-field-item title="建设银行" describe="摘要描述" arrow>
        <p slot="children">
          中国建设银行，在全球范围内为台湾、香港、美国、澳大利亚等国家或地区提供全面金融服务，主要经营公司银行业务、个人银行业务和资金业务，包括居民储蓄存款、信贷资金贷款、住房类贷款、外汇、信用卡，以及投资理财等多种业务。
        </p>
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Field, FieldItem, Switch} from 'mand-mobile'

export default {
  name: 'field-demo',
  /* DELETE */
  title: '多行列表',
  titleEnUS: 'Content List',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Switch.name]: Switch,
  },
  data() {
    return {
      open: false,
    }
  },
}
</script>

<style lang="stylus" scoped>
.holder
  display block
  width 88px
  height 88px
  border-radius 44px
  background-color #E6E6E6
</style>
