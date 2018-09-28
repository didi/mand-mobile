<template>
  <div class="md-example-child md-example-child-detail-item md-example-child-detail-item-0">
    <md-field>
      <md-detail-item title="承保公司" content="众安" bold />
      <md-detail-item title="投保人" content="张三" />
      <md-detail-item title="被保人" content="李四" />
      <md-detail-item title="保险费用" content="0.1元/日" />
      <md-detail-item title="保障日期" content="2018/08/08 ~ 2019/08/08" />
      <md-detail-item title="保单号" content="123456789" />
    </md-field>
  </div>
</template>

<script>import {Field, DetailItem} from 'mand-mobile'

export default {
  name: 'detail-item-demo',

  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
  },
}
</script>
