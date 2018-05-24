<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-0">
    <md-field>
      <md-field-item
        name="arrow1"
        title="禁用"
        customized
        align="right">
        <div class="normal-tip">
          <md-stepper
            disabled
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
  title: '禁用',
  titleEnUS: 'Disabled',
  codeSandBox: 'https://codesandbox.io/s/j473o4l30w',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>