<template>
  <div class="md-example-child md-example-child-field md-example-child-field-0">
    <md-field title="区域标题" describe="区域描述性文本，可根据具体场景配置">
      <template slot="action">
        操作<md-icon name="arrow-right"></md-icon>
      </template>
      <p slot="footer">区域页脚区域内容插槽</p>
      <md-field-item title="标题区域" placeholder="提示文本" />
      <md-field-item title="标题区域" content="内容文本" />
      <md-field-item title="附加内容" content="正文内容">
        <p slot="children">这是子内容区域</p>
      </md-field-item>
      <md-field-item title="动作条目" arrow @click="onClick" />
      <md-field-item title="禁用条目" content="内容禁用状态" arrow disabled />
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

  data() {
    return {
      open: false,
    }
  },

  methods: {
    onClick() {
      Dialog.alert({
        content: '点击了',
      })
    },
  },
}
</script>
