<template>
  <div class="md-example-child md-example-child-textarea md-example-child-textarea-0">
    <md-field>
      <md-textarea-item
        ref="demo1"
        title="错误提示"
        class="example"
        v-model="value"
        @blur="blur"
        @change="change"
        @keyup="keyup"
        @keydown="keydown"
        @focus="focus"
        placeholder=""
        error="输入信息有误!"
      />

    </md-field>
  </div>
</template>

<script>import {TextareaItem, Field} from 'mand-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '错误提示',
  titleEnUS: 'Error tips',
  /* DELETE */
  data() {
    return {
      value: '申请理赔xxx',
    }
  },
  components: {
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
  },
  mounted() {
    // this.$refs.demo1.focus()
  },
  methods: {
    blur() {
      console.log('blur')
    },
    keyup(e) {
      console.log('keyup', e)
    },
    focus() {
      console.log('focus')
    },
    keydown(e) {
      console.log('keydown', e)
    },
    change(v) {
      console.log('change', v)
    },
  },
}
</script>
