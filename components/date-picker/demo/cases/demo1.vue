<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-1">
    <md-date-picker
      type="time"
      :unit-text="['', '', '', '\'', '\'\'']"
      :minute-step="1"
      is-view
    ></md-date-picker>
  </div>
</template>

<script>import {DatePicker} from 'mand-mobile'

export default {
  name: 'date-picker-demo',
  /* DELETE */
  title: '时间选择',
  titleEnUS: 'Time selection',
  /* DELETE */
  components: {
    [DatePicker.name]: DatePicker,
  },
}
</script>