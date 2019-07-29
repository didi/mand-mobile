<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-4">
    <md-field>
      <md-field-item
        title="多选模式"
        :content="selectorValue.join(',')"
        @click="showSelector"
        arrow
      />
    </md-field>
    <md-selector
      v-model="isSelectorShow"
      :data="data[0]"
      :defaultValue="selectorValue"
      title="多选模式"
      min-height="320px"
      okText="确定"
      cancelText="取消"
      large-radius
      @confirm="onSelectorConfirm"
      multi
    ></md-selector>
  </div>
</template>

<script>import {Selector, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'selector-demo',
  /* DELETE */
  title: '多选模式',
  titleEnUS: 'Multi mode',
  height: 500,
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
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorConfirm(array) {
      this.selectorValue = array
    },
  },
}
</script>
