<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-1">
    <md-date-picker
      type="time"
      :unit-text="['', '', '', 'h', 'm']"
      :half-day-text="['AM', 'PM']"
      :minute-step="30"
      is-twelve-hours
      is-view
    ></md-date-picker>
  </div>
</template>

<script>import {DatePicker} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  title: '时间选择',
  components: {
    [DatePicker.name]: DatePicker,
  },
}
</script>