<template>
  <div class="md-example-child md-example-child-field md-example-child-field-1">
    <md-field
      title="区域标题"
    >
      <md-field-item
        name="item0"
        title="步进器"
        align="right">
        <md-stepper></md-stepper>
      </md-field-item>
      <md-input-item
        name="item1"
        title="输入框"
        placeholder="请输入..."
      ></md-input-item>
      <md-field-item
        name="item2"
        title="开关"
        brief="包含子区域"
        align="right">
        <md-switch name="switch0" v-model="switchActive"></md-switch>
        <md-field slot="child" plain>
          <div>
            <md-field-item
              title="企业名称"
              value="xxxxx"
              align="right"
            ></md-field-item>
            <md-field-item
              title="社会信用代码"
              value="xxxxx"
              align="right"
            ></md-field-item>
            <md-field-item
              title="单位电话"
              value="xxxxx"
              align="right"
            ></md-field-item>
          </div>
        </md-field>
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Field, FieldItem, Dialog, InputItem, Stepper, Switch} from 'mand-mobile'

export default {
  name: 'field-demo',
  /* DELETE */
  title: '配合控件',
  titleEnUS: 'With control',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Stepper.name]: Stepper,
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