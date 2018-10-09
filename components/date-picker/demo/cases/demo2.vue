<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-2">
    <md-date-picker
      ref="datePicker"
      type="datetime"
      :min-date="currentDate"
      is-view
    ></md-date-picker>
  </div>
</template>

<script>import {DatePicker, Dialog} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  /* DELETE */
  title: '日期时间选择 <a href="javascript:window.triggerDatePicker0()">getFormatDate()</a>',
  titleEnUS: 'Date & Time selection <a href="javascript:window.triggerDatePicker0()">getFormatDate()</a>',
  /* DELETE */
  components: {
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      currentDate: new Date(),
      minDate: new Date('2018/8/30 11:30'),
    }
  },
  mounted() {
    window.triggerDatePicker0 = () => {
      Dialog.alert({
        content: this.$refs.datePicker.getFormatDate(),
      })
    }
  },
}
</script>
