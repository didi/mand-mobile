<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-1">
    <md-selector
      value
      :data="data[0]"
      title="自定义选项"
    >
      <template slot-scope="{ option }">
        <div class="md-selector-custom-brief">{{ option.text }}使用slot-scope</div>
      </template>
    </md-selector>
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
      selectorValue: '',
    }
  },
}
</script>

<style lang="stylus">
.md-example-child-selector-1
  .md-selector-custom-brief
    font-size 20px
    color #999
</style>
