<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-2">
    <md-field title="简单选择列表" class="radio-field">
      <md-radio-list
        v-model="myBank"
        :options="banks"
        icon-size="lg"
      />
    </md-field>
    <md-field title="输入项" class="radio-field">
      <md-radio-list
        :options="reasons"
        v-model="myReason"
        icon="right"
        icon-inverse=""
        icon-disabled=""
        icon-position="right"
        has-input
        input-label="其他"
        input-placeholder="请输入原因"
      />
    </md-field>
  </div>
</template>

<script>import {Field, RadioList} from 'mand-mobile'

export default {
  name: 'radio-demo',
  components: {
    [Field.name]: Field,
    [RadioList.name]: RadioList,
  },
  data() {
    return {
      myBank: '',
      banks: [
        {
          value: '0',
          text: '交通银行(尾号3089)',
          brief: '选项摘要描述',
        },
        {
          value: '1',
          text: '招商银行(尾号2342)',
          brief: '选项摘要描述',
        },
        {
          value: '2',
          text: '建设银行(尾号4321)',
          brief: '选项摘要描述',
          disabled: true,
        },
      ],
      myReason: '',
      reasons: [
        {
          value: '0',
          text: '我有其他保险',
        },
        {
          value: '1',
          text: '每单都扣，我担心扣太多',
        },
        {
          value: '2',
          text: '我身体好，不需要重疾险',
        },
        {
          value: '3',
          text: '接单少，加入这个没什么用',
        },
        {
          value: '4',
          text: '我不了解这是什么计划',
        },
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
  .radio-field
    margin-bottom 40px
</style>
