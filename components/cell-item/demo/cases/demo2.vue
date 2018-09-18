<template>
  <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-2">
    <md-field>
      <md-cell-item title="交通银行(尾号3089)" describe="展示摘要描述" />
      <md-cell-item title="招商银行(尾号2342)" describe="展示摘要描述">
        <md-switch v-model="open" slot="addon" />
      </md-cell-item>
      <md-cell-item title="交通银行(尾号3089)" describe="展示摘要描述" addon="附加文案" arrow />
      <md-cell-item title="交通银行" describe="展示摘要描述" addon="附加文案" arrow>
        <span class="holder" slot="start"></span>
      </md-cell-item>
      <md-cell-item title="招商银行" describe="展示摘要描述" addon="禁用的项目" disabled arrow>
        <span class="holder" slot="start"></span>
      </md-cell-item>
      <md-cell-item title="建设银行" describe="摘要描述" arrow>
        <p slot="children">
          中国建设银行，在全球范围内为台湾、香港、美国、澳大利亚等国家或地区提供全面金融服务，主要经营公司银行业务、个人银行业务和资金业务，包括居民储蓄存款、信贷资金贷款、住房类贷款、外汇、信用卡，以及投资理财等多种业务。
        </p>
      </md-cell-item>
    </md-field>
  </div>
</template>

<script>import {Field, CellItem, Switch} from 'mand-mobile'

export default {
  name: 'cell-item-demo',
  /* DELETE */
  title: '多行列表',
  titleEnUS: 'Content List',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
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
