<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-2">
    <md-radio
      ref="radio"
      :options="data"
    >
      <template slot-scope="{ option }">
        <div class="md-radio-custom-title" v-text="option.text"></div>
        <div class="md-radio-custom-brief">{{ option.text }}的自定义描述</div>
      </template>
    </md-radio>
  </div>
</template>

<script>import {Radio} from 'mand-mobile'

export default {
  name: 'radio-demo',
  title: '自定义选项内容1',
  describe: '使用slot-scope',
  components: {
    [Radio.name]: Radio,
  },
  data() {
    return {
      data: [{text: '选项1'}, {text: '选项2'}],
    }
  },
}
</script>

<style lang="stylus">
.md-example-child-radio-2
  .md-radio-custom-title
    font-size 28px
  .md-radio-custom-brief
    font-size 20px
    color #999
</style>