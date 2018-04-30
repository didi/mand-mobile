<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-2">
    <md-field>
      <md-field-item
        name="name"
        title="确认模式"
        arrow="arrow-right"
        align="right"
        :value="selectorValue"
        @click.native="showSelector">
      </md-field-item>
    </md-field>
    <md-selector
      v-model="isSelectorShow"
      :data="data[0]"
      :default-index="1"
      title="确认模式"
      okText="确认"
      cancelText="取消"
      @confirm="onSelectorConfirm($event)"
    ></md-selector>
  </div>
</template>

<script>
import {Selector, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'selector-demo',
  /* DELETE */
  title: '需确认',
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
            text: '选项一',
          },
          {
            text: '选项二',
          },
          {
            text: '选项三',
          },
          {
            text: '选项四',
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