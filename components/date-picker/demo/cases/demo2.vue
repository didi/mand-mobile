<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-2">
    <md-date-picker
      ref="datePicker"
      type="datetime"
      :default-date="currentDate"
      is-twelve-hours
      is-view
    ></md-date-picker>
  </div>
</template>

<script>import {DatePicker, Dialog} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  title: '日期时间选择 <a href="javascript:window.triggerDatePicker0()">getFormatDate()</a>',
  components: {
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      currentDate: new Date(),
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
