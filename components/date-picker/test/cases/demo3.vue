<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-3">
    <md-date-picker
      ref="datePicker"
      type="custom"
      title="选择出险时间"
      :text-render="textRender"
      :custom-types="['yyyy', 'MM','dd', 'hh', 'mm']"
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="currentDate"
      is-view
    ></md-date-picker>
  </div>
</template>

<script>import {DatePicker} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  components: {
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      currentDate: new Date('2019-10-01 00:00'),
      minDate: new Date('2009-10-01'),
      maxDate: new Date('2029-10-01'),
    }
  },
  methods: {
    textRender() {
      const args = Array.prototype.slice.call(arguments)
      const typeFormat = args[0] // 类型
      // const column0Value = args[1] // 第1列选中值
      // const column1Value = args[2] // 第2列选中值
      const column2Value = args[3] // 第3列选中值
      if (typeFormat === 'dd') {
        return `*${column2Value}日`
      }
    },
  },
}
</script>