<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-0">
    <md-date-picker
      ref="datePicker"
      today-text="今天"
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
      minDate: new Date('2013/9/9'),
      maxDate: new Date('2020/9/9'),
      currentDate: new Date(),
    }
  },
}
</script>
