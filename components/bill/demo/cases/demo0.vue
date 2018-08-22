<template>
  <div class="md-example-child md-example-child-bill-0">
    <md-bill
      name="借款电子票据"
      no="12345689"
      water-mark="MAND-MOBILE"
    >
      <div>
        <md-field-item
          title="借款金额"
          value="￥30,000"
          align="right"
        ></md-field-item>
        <md-field-item
          title="收款账户"
          align="right"
          customized
        >
          <md-icon name="bank-zs" style="margin-right:10px;"></md-icon>招商银行(尾号xxxx)
        </md-field-item>
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
        <md-field-item
          title="还款"
          align="right"
          customized
        >
          <md-tag size="tiny" shape="fillet" type="fill" style="margin-right:10px;">首次</md-tag>
          ￥404.50(9月22日)
        </md-field-item>
      </div>
      <div slot="description">
        1 账单生成后显示在滴水贷首页，请按时还款避免逾期。 <br>
        2 整笔账单还款完成后，额度将恢复。暂不支持额度实时恢复。<br>
        3 还款日将自动扣款，扣款顺序优先余额，其次还款账户：工商银行 (尾号xxxx)。      
      </div>
    </md-bill>
	</div>
</template>

<script>import '@examples/assets/images/bank-zs.svg'
import {Bill, FieldItem, Icon, Tag} from 'mand-mobile'

export default {
  name: 'bill-demo',
  components: {
    [Bill.name]: Bill,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
  },
}
</script>

<style lang="stylus">
.md-example-child-bill-0
  .md-bill
    .bill-radius i 
      background #f3f4f5 !important
</style>