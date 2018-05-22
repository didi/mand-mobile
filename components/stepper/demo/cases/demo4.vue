<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-4">
    <md-field>
      <md-field-item
        name="arrow4"
        title="最小值4大于默认值"
        customized
        align="right">
        <div class="normal-tip">
          <md-stepper
            :min="4"
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
  title: '最小值4大于默认值',
  codeSandBox: 'https://codesandbox.io/s/jp85vkvly',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Stepper.name]: Stepper,
  },
}
</script>