<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-8">
    <md-steps
      direction="vertical"
      :steps="steps0"
      :current="0.5"
    >
      <template slot="reached">
        <md-icon name="checked"></md-icon>
      </template>
      <div
        class="custom-content"
        slot="content"
        slot-scope="{ index, step }"
      >
        <template v-if="index === 0">
          <p class="name active" v-text="step.name"></p>
          <p class="amount">
            <md-amount :value="+step.amount"></md-amount>元
          </p>
          <p class="desc" v-html="step.text"></p>
        </template>
        <template v-else>
          <p class="name" v-text="step.name"></p>
        </template>
      </div>
    </md-steps>
    <md-steps
      direction="vertical"
      :steps="steps1"
      :current="1"
    >
      <template slot="current">
        <md-icon name="checked"></md-icon>
      </template>
      <div
        class="custom-content"
        slot="content"
        slot-scope="{ index, step }"
      >
        <template v-if="index === 1">
          <p class="name active" v-text="step.name"></p>
          <p class="amount">
            <md-amount :value="+step.amount"></md-amount>元
          </p>
        </template>
        <template v-else>
          <p class="name" v-text="step.name"></p>
        </template>
      </div>
    </md-steps>
  </div>
</template>

<script>import {Steps, Amount, Icon} from 'mand-mobile'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '自定义内容',
  titleEnUS: 'Custom content',
  /* DELETE */
  components: {
    [Steps.name]: Steps,
    [Amount.name]: Amount,
    [Icon.name]: Icon,
  },
  data() {
    return {
      steps0: [
        {
          name: '还款申请已提交',
          amount: '600.5',
          text: '银行处理中，预计<span>30分钟</span>内到账，请留意短信信息。如有疑问，请联系客服。',
        },
        {
          name: '还款成功',
        },
      ],
      steps1: [
        {
          name: '还款申请已提交',
        },
        {
          name: '还款成功',
          amount: '600.5',
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
.md-example-child-steps-8
  .custom-content
    .name
      font-size 28px
      color #858B9C
      &.active
        font-size 40px
        color #111A34
    .amount
      margin-top 20px
      color #111A34
      .md-amount
        margin-right 5px
        font-size 80px
    .desc
      line-height 40px !important
      span
        color #FF8325
</style>

