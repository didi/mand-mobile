<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-4">
    <md-selector
      v-model="isSelectorShow"
      :data="data[0]"
      :defaultValue="selectorValue"
      title="多选模式"
      min-height="320px"
      okText="确定"
      cancelText="取消"
      multi
    ></md-selector>
  </div>
</template>

<script>import {Selector} from 'mand-mobile'

export default {
  name: 'selector-demo',
  components: {
    [Selector.name]: Selector,
  },
  data() {
    return {
      isSelectorShow: false,
      data: [
        [
          {
            value: '1',
            text: '选项一',
          },
          {
            value: '2',
            text: '选项二',
          },
          {
            value: '3',
            text: '选项三',
          },
          {
            value: '4',
            text: '选项四',
          },
        ],
      ],
      selectorValue: ['1'],
    }
  },
}
</script>
