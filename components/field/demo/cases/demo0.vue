<template>
  <div class="md-example-child md-example-child-field md-example-child-field-0">
    <md-field title="单个条目">
      <md-field-item
        name="item0"
        title="可点击条目"
        arrow="arrow-right"
        solid
        @click="onClick">
      </md-field-item>
    </md-field>
    <md-field title="单个条目">
      <md-field-item
        name="item1"
        title="禁用条目"
        arrow="arrow-right"
        disabled
        @click="onClick">
      </md-field-item>
    </md-field>
    <md-field title="单个条目">
      <md-field-item
        name="item2"
        title="标题"
        brief="展示摘要描述"
        arrow="arrow-right"
        @click="onClick">
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Field, FieldItem, Dialog} from 'mand-mobile'

export default {
  name: 'field-demo',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
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
.md-example-child-field-0
  .md-field
    margin-bottom 20px
  .md-input-item
    background #FFF
    padding 0 32px
  .strong-tip
    font-size 24px
    color color-text-hightlight
</style>