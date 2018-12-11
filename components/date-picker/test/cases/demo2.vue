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

<script>import {DatePicker} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  components: {
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      currentDate: new Date('2018/10/10'),
      minDate: new Date('2018/8/30 11:30'),
    }
  },
}
</script>
