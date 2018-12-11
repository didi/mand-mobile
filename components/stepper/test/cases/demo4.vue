<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-4">
    <md-field>
      <md-field-item title="最小值4大于默认值">
        <md-stepper slot="right" :min="4" />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Stepper, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'stepper-demo',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>
