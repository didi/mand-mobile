<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-3">
    <md-field>
      <md-field-item
        name="name"
        title="出险时间"
        arrow="arrow-right"
        align="right"
        :content="datePickerValue"
        @click.native="isDatePickerShow = true">
      </md-field-item>
    </md-field>
    <md-date-picker
      ref="datePicker"
      v-model="isDatePickerShow"
      type="custom"
      title="选择出险时间"
      :text-render="textRender"
      :custom-types="['yyyy', 'MM','dd', 'hh', 'mm']"
      :default-date="currentDate"
    ></md-date-picker>
  </div>
</template>

<script>import {DatePicker, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  components: {
    [DatePicker.name]: DatePicker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  data() {
    return {
      currentDate: new Date('2018/10/10'),
      isDatePickerShow: true,
      datePickerValue: '',
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