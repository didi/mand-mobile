<template>
  <div class="md-example-child md-example-child-check md-example-child-check-5">
    <md-radio-group v-model="insurants">
      <md-radio-box name="self">自己</md-radio-box>
      <md-radio-box name="couple">配偶</md-radio-box>
      <md-radio-box name="parent">父母</md-radio-box>
      <md-radio-box name="child" disabled>子女</md-radio-box>
    </md-radio-group>
	</div>
</template>

<script>import {RadioBox, RadioGroup} from 'mand-mobile'

export default {
  name: 'radio-demo',
  components: {
    [RadioBox.name]: RadioBox,
    [RadioGroup.name]: RadioGroup,
  },
  data() {
    return {
      insurants: 'self',
    }
  },
}
</script>
