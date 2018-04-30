<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-2">
    <md-field>
      <md-field-item
        name="arrow3"
        title="最小值-12，最大值18"
        customized
        align="right">
        <div class="normal-tip">
          <md-stepper
            :min="-12"
            :max="18"
          ></md-stepper>
        </div>
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Stepper, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'stepper-demo',
  /* DELETE */
  title: '最小值-12，最大值18',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>