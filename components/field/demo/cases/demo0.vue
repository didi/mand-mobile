<template>
  <div class="md-example-child md-example-child-field md-example-child-field-0">
    <md-field title="区域标题">
      <div
        class="field-operator"
        slot="titleValue"
        @click="onClick('操作')"
      >
        操作<md-icon name="arrow-right"></md-icon>
      </div>
      <div>
        <md-field-item
          name="item0"
          title="普通条目"
        >
        </md-field-item>
        <md-field-item
          name="item1"
          title="动作条目"
          arrow="arrow-right"
          solid
          @click="onClick">
        </md-field-item>
        <md-field-item
          name="item2"
          title="禁用条目"
          arrow="arrow-right"
          disabled
          @click="onClick">
        </md-field-item>
        <md-field-item
          name="item4"
          title="标题"
          brief="展示摘要描述"
          arrow="arrow-right"
          @click="onClick">
        </md-field-item>
      </div>
    </md-field>
  </div>
</template>

<script>import {Field, FieldItem, Dialog, Icon} from 'mand-mobile'

export default {
  name: 'field-demo',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
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

<style lang="stylus">
.md-example-child-field-0
  .md-field
    margin-bottom 20px
  .field-operator
    display flex
    align-items center
    justify-content flex-end
  .md-input-item
    background #FFF
    padding 0 32px
  .strong-tip
    font-size 24px
    color color-text-highlight
</style>