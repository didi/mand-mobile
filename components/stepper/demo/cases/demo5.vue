<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-5">
    <md-field>
      <md-field-item title="step为小数0.1">
        <md-stepper slot="right" :step="0.1" />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>
import {Stepper, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: 'step为小数1.3',
  titleEnUS: 'Step is a decimal, 1.3',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}

</script>
