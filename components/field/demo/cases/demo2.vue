<template>
  <div class="md-example-child md-example-child-field md-example-child-field-2">
    <md-field title="包含内容的条目">
      <md-field-item
        name="item0"
        title="短标题"
        arrow="arrow-right"
        value="内容靠左展示"
        align="left"
        @click="onClick">
      </md-field-item>
      <md-field-item
        name="item1"
        title="一个不换行的长标题"
        arrow="arrow-right"
        value="内容居中展示"
        align="center"
        @click="onClick">
      </md-field-item>
      <md-field-item
        name="item2"
        title="一个换行的长标题"
        arrow="arrow-right"
        value="内容靠右展示"
        solid
        align="right"
        @click="onClick">
      </md-field-item>
    </md-field>
  </div>
</template>

<script>
import {Field, FieldItem, InputItem, Dialog} from 'mand-mobile'

export default {
  name: 'field-demo',
  /* DELETE */
  title: '包含内容',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
  },
  methods: {
    onClick(name) {
      Dialog.alert({
        content: `点击了 ${name}`,
      })
    },
  },
}

</script>

<style lang="stylus" scoped>
.md-example-child-field-2
  .md-input-item
    background #FFF
    padding 0 32px
  .strong-tip
    font-size 24px
    color color-text-hightlight
</style>