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
      hide-title-bar
      large-radius
      is-check
      iconSize="lg"
      @choose="onSelectorChoose"
    >
      <div class="selector-header" slot="header">
        Header Slot
      </div>
      <template slot-scope="{ option, index, selected }">
        <!-- <div class="md-selector-custom-brief">{{ option.text }}使用slot-scope</div> -->
        <div class="selector-item-body" :class="{disabled: option.disabled, selected}">
          <div class="selector-item-left">
            <span class="holder" v-text="option.value"></span>
          </div>
          <div class="selector-item-content">
            <p class="selector-item-title" v-text="option.text"></p>
            <p class="selector-item-brief" v-text="`${option.describe}-${index}`"></p>
          </div>
        </div>
      </template>
      <div class="selector-footer" slot="footer">
        Footer Slot
      </div>
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
            value: 'A',
            text: '选项一',
            describe: '使用slot-scope',
          },
          {
            value: 'B',
            text: '选项二',
            describe: '使用slot-scope',
          },
          {
            value: 'C',
            text: '选项三',
            describe: '使用slot-scope',
            disabled: true,
          },
          {
            value: 'D',
            text: '选项四',
            describe: '使用slot-scope',
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
  .selector-header, .selector-footer
    padding 15px 40px
    font-size 16px
    color #ccc
  .selector-item-body
    display flex
    align-items center
    &.selected
      .selector-item-content
        color #2f86f6
    &.disabled
      opacity .3
    .selector-item-left
      flex-shrink 0
      margin-right 32px
      .holder
        display block
        width 88px
        height 88px
        border-radius 44px
        background-color #e6e6e6
        font-size 32px
        font-weight 500
        color #2f86f6
        text-align center
        line-height 88px
    .selector-item-content
      flex 1
      color #111a34
      font-size 32px
      line-height 1.2
      .selector-item-title
        line-height 1.2
      .selector-item-brief
        color #858b9c
        font-size 24px
        line-height 1.4
        margin-top 8px
</style>
