<template>
  <div class="md-example-child md-example-child-field md-example-child-field-1">
    <md-field title="包含多个条目的列表">
      <md-field-item
        name="item0"
        title="普通条目"
        arrow="arrow-right"
        @click="onClick">
      </md-field-item>
      <md-field-item
        name="item1"
        title="标题"
        brief="展示摘要描述，摘要较长时会自动换行"
        arrow="arrow-right"
        solid
        @click="onClick">
      </md-field-item>
      <md-field-item
        name="item2"
        title="使用switch"
        align="right">
        <md-switch name="switch0" v-model="switchActive"></md-switch>
      </md-field-item>
      <md-field-item
        name="item3"
        title="输入框"
        customized
        align="center">
        <md-input-item
          ref="input1"
          placeholder="请输入..."
        ></md-input-item>
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Field, FieldItem, Dialog, InputItem, Switch} from 'mand-mobile'

export default {
  name: 'field-demo',
  /* DELETE */
  title: '多个条目',
  titleEnUS: 'Multiple items',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Switch.name]: Switch,
  },
  data() {
    return {
      switchActive: false,
    }
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
.md-example-child-field-1
  .md-input-item
    background #FFF
    padding 0 32px
  .strong-tip
    font-size 24px
    color color-text-highlight
</style>