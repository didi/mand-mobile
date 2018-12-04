<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-1">
    <md-field>
      <md-field-item
        title="自定义"
        :content="selectorValue"
        @click="showSelector"
        arrow
        solid
      />
    </md-field>
    <md-selector
      v-model="isSelectorShow"
      :data="data[0]"
      title="自定义选项"
      @choose="onSelectorChoose"
    >
      <template slot-scope="{ option }">
        <div class="md-selector-custom-brief">{{ option.text }}使用slot-scope</div>
      </template>
    </md-selector>
  </div>
</template>

<script>import {Selector, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'selector-demo',
  /* DELETE */
  title: '自定义选项',
  titleEnUS: 'Custom options',
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
      selectorValue: '',
    }
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose({text}) {
      this.selectorValue = text
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-selector-1
  .md-selector-custom-brief
    font-size 20px
    color #999
</style>
