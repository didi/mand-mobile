<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-1">
    <md-field>
      <md-field-item
        name="name"
        title="自定义选项"
        arrow="arrow-right"
        align="right"
        :value="selectorValue"
        @click.native="showSelector">
      </md-field-item>
    </md-field>
    <md-selector
      v-model="isSelectorShow"
      :data="data[0]"
      title="自定义选项"
      :optionRender="optionRender"
      @choose="onSelectorChoose($event)"
    >
      <!-- <template slot-scope="{ option }">
        <div class="md-selector-custom-title" v-text="option.text"></div>
        <div class="md-selector-custom-brief">{{ option.text }}使用slot-scooped的自定义描述</div>
      </template> -->
    </md-selector>
  </div>
</template>

<script>import {Selector, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'selector-demo',
  /* DELETE */
  title: '自定义选项',
  titleEnUS: 'Custom options',
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
        ],
      ],
      selectorValue: '',
    }
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    optionRender({text}) {
      return `<div class="md-selector-custom-title">${text}</div><div class="md-selector-custom-brief">${text}使用option-render的的自定义描述</div>`
    },
    onSelectorChoose({text}) {
      this.selectorValue = text
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-selector-1
  .md-selector-custom-title
    font-size 28px
  .md-selector-custom-brief
    font-size 20px
    color #999
</style>