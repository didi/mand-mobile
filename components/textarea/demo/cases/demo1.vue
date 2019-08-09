<template>
  <div class="md-example-child md-example-child-textarea md-example-child-textarea-0">
    <md-field>
      <md-textarea
        ref="demo0"
        title="错误提示"
        class="example"
        v-model="value"
        placeholder=""
        error="输入信息有误!"
      />

    </md-field>
  </div>
</template>

<script>import {Textarea, Field} from 'mand-mobile'

export default {
  name: 'tips-demo',
  title: '错误提示',
  titleEnUS: 'error-tip',
  data() {
    return {
      value: '申请理赔xxx',
    }
  },
  components: {
    [Textarea.name]: Textarea,
    [Field.name]: Field,
  },
}
</script>
