<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-0">
    <md-field>
      <md-field-item title="禁用">
        <md-stepper slot="right" disabled />
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
