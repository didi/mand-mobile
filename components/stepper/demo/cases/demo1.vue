<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-1">
    <md-field>
      <md-field-item title="只读">
        <md-stepper slot="right" read-only />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Stepper, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '只读',
  titleEnUS: 'Readonly',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>
