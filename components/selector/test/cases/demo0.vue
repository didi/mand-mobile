<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-0">
    <md-selector
      value
      default-value="2"
      :data="data[0]"
      max-height="320px"
      title="普通模式"
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
          {
            value: '5',
            text: '选项五',
          },
          {
            value: '6',
            text: '选项六',
          },
          {
            value: '7',
            text: '选项七',
          },
          {
            value: '8',
            text: '选项八',
          },
          {
            value: '9',
            text: '选项九',
          },
          {
            value: '10',
            text: '选项十',
          },
        ],
      ],
      selectorValue: '选项二',
    }
  },
}
</script>
