<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-1">
    <md-field>
      <md-field-item
        name="arrow2"
        title="只读"
        customized
        align="right">
        <div class="normal-tip">
          <md-stepper
            read-only
          ></md-stepper>
        </div>
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Stepper, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'stepper-demo',
  title: '只读',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>