<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-0">
    <md-date-picker
      ref="datePicker"
      today-text="今天"
      :minDate="minDate"
      :maxDate="maxDate"
      :default-date="currentDate"
      is-view
      @initialed="onDatePickerInitialed"
    ></md-date-picker>
  </div>
</template>

<script>
import {DatePicker} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  /* DELETE */
  title: '日期选择',
  describe: '2013/9/9 - 2020/9/9',
  /* DELETE */
  components: {
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      minDate: new Date('2013/9/9'),
      maxDate: new Date('2020/9/9'),
      currentDate: new Date(),
    }
  },
  methods: {
    onDatePickerInitialed() {
      console.log(`[Mand Mobile] DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate('yyyy/MM/dd')}`)
    },
  },
}

</script>
