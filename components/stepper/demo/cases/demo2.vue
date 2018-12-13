<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-2">
    <md-field>
      <md-field-item title="最小值-12，最大值18">
        <md-stepper slot="right" v-model="value" min="-12" max="18" />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Stepper, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '最小值-12，最大值18',
  titleEnUS: 'Minimum is -12 and maximum is 18',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
  data() {
    return {
      value: 0,
    }
  },
}
</script>
