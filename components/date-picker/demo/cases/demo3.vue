<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-3">
    <md-field>
      <md-field-item
        name="name"
        title="出险时间"
        arrow="arrow-right"
        align="right"
        :value="datePickerValue"
        @click.native="isDatePickerShow = true">
      </md-field-item>
    </md-field>
    <md-date-picker
      ref="datePicker"
      v-model="isDatePickerShow"
      type="custom"
      today-text="&(今天)"
      title="选择出险时间"
      is-twelve-hours
      :text-render="textRender"
      :custom-types="['yyyy', 'MM','dd', 'hh']"
      :default-date="currentDate"
      @change="onDatePickerChange"
      @confirm="onDatePickerConfirm"
    ></md-date-picker>
  </div>
</template>

<script>import {DatePicker, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  /* DELETE */
  title: '自定义类型和选项文案值',
  height: 500,
  /* DELETE */
  components: {
    [DatePicker.name]: DatePicker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  data() {
    return {
      currentDate: new Date(),
      isDatePickerShow: false,
      datePickerValue: '',
    }
  },
  methods: {
    textRender() {
      const args = Array.prototype.slice.call(arguments)
      const typeFormat = args[0] // 类型
      const column0Value = args[1] // 第1列选中值
      const column1Value = args[2] // 第2列选中值
      const column2Value = args[3] // 第3列选中值

      if (typeFormat === 'dd') {
        return `${column0Value}/${column1Value}/${column2Value}`
      }
    },
    onDatePickerChange(columnIndex, itemIndex, value) {
      console.log(
        `[Mand Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
          value,
        )}`,
      )
    },
    onDatePickerConfirm(columnsValue) {
      console.log(`[Mand Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
      this.datePickerValue = this.$refs.datePicker.getFormatDate('dd日hh时mm分')
    },
  },
}
</script>