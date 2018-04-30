<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-0">
    <md-radio
      ref="radio"
      :options="data"
      :default-index="1"
    >
    </md-radio>
  </div>
</template>

<script>
import {Radio, Dialog} from 'mand-mobile'

export default {
  name: 'radio-demo',
  /* DELETE */
  title:
    '普通单选框 <a href="javascript:window.RadioTrigger0()">getSelectedValue</a><a href="javascript:window.RadioTrigger1()">getSelectedIndex</a>',
  describe: '通过default-index默认选中',
  /* DELETE */
  components: {
    [Radio.name]: Radio,
  },
  data() {
    return {
      data: [{text: '选项1', disabled: true}, {text: '选项2'}, {text: '选项3'}],
    }
  },
  mounted() {
    window.RadioTrigger0 = () => {
      this.getSelectedValue('radio')
    }
    window.RadioTrigger1 = () => {
      this.getSelectedIndex('radio')
    }
  },
  methods: {
    getSelectedValue(radio) {
      Dialog.alert({
        content: `<pre>${JSON.stringify(this.$refs[radio].getSelectedValue())}</pre>`,
      })
    },
    getSelectedIndex(radio) {
      Dialog.alert({
        content: `<pre>${JSON.stringify(this.$refs[radio].getSelectedIndex())}</pre>`,
      })
    },
  },
}

</script>