<template>
  <div class="md-example-child md-example-child-check md-example-child-check-4">
    <md-radio-box name="day" v-model="pay" label="日缴" disabled />
    <md-radio-box name="month" v-model="pay" label="月付" />
    <md-radio-box name="season" v-model="pay" label="季度费" />
	</div>
</template>

<script>import {RadioBox} from 'mand-mobile'

export default {
  name: 'radio-demo',
  components: {
    [RadioBox.name]: RadioBox,
  },
  data() {
    return {
      pay: '',
    }
  },
}
</script>
