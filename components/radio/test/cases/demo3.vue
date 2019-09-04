<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-3">
    <md-radio-group v-model="favorites">
      <md-radio name="watermelon" label="西瓜"/>
      <md-radio name="apple" label="苹果" />
      <md-radio name="banana" label="香蕉" />
      <md-radio name="orange" label="橙子" />
      <md-radio name="tomato" label="西红柿" disabled />
    </md-radio-group>
  </div>
</template>

<script>import {Radio, RadioGroup} from 'mand-mobile'

export default {
  name: 'radio-demo',
  components: {
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
  },
  data() {
    return {
      favorites: 'apple',
    }
  },
}
</script>
