<template>
  <div class="md-example-child md-example-child-bill-1">
    <md-bill>
      <div class="header-slot" slot="header">
        <h1 class="title">借款单据</h1>
        <p class="desc">仔细阅读，关注您的利益、义务</p>
      </div>
      <md-detail-item title="借款金额">
        &yen;30,000
      </md-detail-item>
      <md-detail-item title="收款账户">
        <md-icon name="bank-zs" svg style="margin-right:10px;"></md-icon>招商银行(尾号xxxx)
      </md-detail-item>
      <md-detail-item title="借款期数" content="12期" />
      <md-detail-item title="正常还款总息">
        &yen;140.50
      </md-detail-item>
      <md-detail-item title="还款">
        <md-tag
          size="small"
          shape="fillet"
          type="fill"
          fill-color="#858B9C"
          style="margin-right:4px;"
        >首次</md-tag>
        &yen;404.50&nbsp;(9月22日)
      </md-detail-item>
      <div class="footer-slot" slot="footer">
        1 账单生成后显示在滴水贷首页，请按时还款避免逾期。 <br>
        2 整笔账单还款完成后，额度将恢复。暂不支持额度实时恢复。<br>
        3 还款日将自动扣款，扣款顺序优先余额，其次还款账户：工商银行 (尾号xxxx)。
      </div>
    </md-bill>
	</div>
</template>

<script>import '@examples/assets/images/bank-zs.svg'
import {Bill, DetailItem, Icon, Tag} from 'mand-mobile'

export default {
  name: 'bill-demo',
  /* DELETE */
  title: '使用插槽',
  titleEnUS: 'Using slots',
  /* DELETE */
  components: {
    [Bill.name]: Bill,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
  },
}
</script>

<style lang="stylus">
.md-example-child-bill-1
  .md-bill
    background-color #FFF
    box-shadow 0 6px 24px rgba(17, 26, 52, .05)
    &.md-water-mark
      overflow visible
    .md-bill-neck
      &:before, &:after
        content ''
        position absolute
        top 0
        width 36px
        height 36px
        border-radius 18px
        background-color #F3F4F5
      &:before
        left -46px
      &:after
        right -46px
    .header-slot
      padding 40px 0 20px 0
      .title
        color #111A34
        font-size 60px
        font-family Songti SC
        line-height 1
      .desc
        margin-top 16px
        color #858B9C
        font-size 26px
    .footer-slot
      padding 32px 0
      color #858B9C
      font-size 22px
      line-height 1.5
      border-top solid 1px #E1E4EB
</style>
