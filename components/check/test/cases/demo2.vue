<template>
  <div class="md-example-child md-example-child-check md-example-child-check-2">
    <md-check-box name="day" v-model="pay" label="日缴" disabled />
    <md-check-box name="month" v-model="pay" label="月付" />
    <md-check-box name="season" v-model="pay" label="季度费" />
	</div>
</template>

<script>import {CheckBox} from 'mand-mobile'

export default {
  name: 'check-demo',
  components: {
    [CheckBox.name]: CheckBox,
  },
  data() {
    return {
      pay: '',
    }
  },
}
</script>
