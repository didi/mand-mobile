<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-3">
    <md-radio
      ref="radio"
      :options="data"
      :optionRender="optionRender"
    ></md-radio>
  </div>
</template>

<script>import {Radio} from 'mand-mobile'

export default {
  name: 'radio-demo',
  /* DELETE */
  title: '自定义选项内容2',
  describe: '使用option-render',
  /* DELETE */
  components: {
    [Radio.name]: Radio,
  },
  data() {
    return {
      data: [{text: '选项1'}, {text: '选项2'}],
    }
  },
  methods: {
    optionRender(item) {
      return `<div class="md-radio-custom-title">${item.text}</div><div class="md-radio-custom-brief">${item.text}的自定义描述</div>`
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-radio-3
  .md-radio-custom-title
    font-size 28px
  .md-radio-custom-brief
    font-size 20px
    color #999
</style>
