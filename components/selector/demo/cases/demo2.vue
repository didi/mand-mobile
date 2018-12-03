<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-2">
    <md-field>
      <md-field-item
        title="确认模式"
        :content="selectorValue"
        @click="showSelector"
        arrow
        solid
      />
    </md-field>
    <md-selector
      v-model="isSelectorShow"
      :data="data[0]"
      min-height="320px"
      title="确认模式"
      okText="确认"
      @confirm="onSelectorConfirm"
    ></md-selector>
  </div>
</template>

<script>import {Selector, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'selector-demo',
  /* DELETE */
  title: '确认模式',
  titleEnUS: 'Confirmed mode',
  height: 400,
  /* DELETE */
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
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
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorConfirm({text}) {
      this.selectorValue = text
    },
  },
}
</script>
