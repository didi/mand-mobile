<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-5">
    <md-field>
      <md-field-item
        name="arrow5"
        title="step为小数1.3"
        customized
        align="right">
        <div class="normal-tip">
          <md-stepper
            :step="1.3"
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
  title: 'step为小数1.3',
  titleEnUS: 'Step is a decimal, 1.3',
  codeSandBox: 'https://codesandbox.io/s/6vkpwr842w',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>