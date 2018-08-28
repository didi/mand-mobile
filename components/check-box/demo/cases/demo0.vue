<template>
  <div class="md-example-child">
    <md-check-box
      v-model="selected"
      :options="options"
    >
    </md-check-box>
	</div>
</template>

<script>import {CheckBox} from 'mand-mobile'

export default {
  name: 'check-box-demo',
  title: '样例一',
  describe: '',
  components: {
    [CheckBox.name]: CheckBox,
  },
  data() {
    return {
      selected: [],
      options: [{value: '1', label: '日缴'}, {value: '2', label: '月付'}, {value: '3', label: '季度缴'}],
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
