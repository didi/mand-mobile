<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-1">
    <md-radio
      ref="radio"
      :options="data"
      v-model="optionValue"
      input-option-label="其它选项"
      input-option-placeholder="其它选项内容"
      has-input-option
      @change="onRadioChange"
      @input="onRadioInput"
    ></md-radio>
  </div>
</template>

<script>import {Radio} from 'mand-mobile'

export default {
  name: 'radio-demo',
  title: '可编辑选项单选框 <a href="javascript:window.RadioTrigger2()">selectByIndex(2)</a>',
  describe: '通过value初始值默认选中',
  components: {
    [Radio.name]: Radio,
  },
  data() {
    return {
      data: [{text: '选项1'}, {text: '选项2'}],
      optionValue: '选项2',
    }
  },
  mounted() {
    window.RadioTrigger2 = () => {
      this.selectByIndex('radio', 2)
    }
  },
  methods: {
    onRadioChange(value, index) {
      console.log(`[Mand-Mobile]: Radio, options: ${JSON.stringify(value)}, index: ${index}`)
    },
    onRadioInput(value) {
      console.log(`[Mand-Mobile]: Radio, options: ${JSON.stringify(value)}`)
    },
    selectByIndex(radio, index) {
      this.$refs[radio].selectByIndex(index)
    },
  },
}
</script>