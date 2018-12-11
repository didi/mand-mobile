<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-2">
    <md-selector
      value
      :data="data[0]"
      min-height="320px"
      title="确认模式"
      okText="确认"
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
            brief: '选项一说明',
          },
          {
            value: '2',
            text: '选项二',
            brief: '选项二说明',
          },
          {
            value: '3',
            text: '选项三',
            brief: '选项三说明',
          },
          {
            value: '4',
            text: '选项四',
            brief: '选项四说明',
          },
        ],
      ],
      selectorValue: '',
    }
  },
}
</script>
