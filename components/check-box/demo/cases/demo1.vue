<template>
  <div class="md-example-child">
    <md-check-box
      v-model="selected"
      :options="options"
      :max="2"
      :cols="4"
    >
    </md-check-box>
	</div>
</template>

<script>import {CheckBox} from 'mand-mobile'

export default {
  name: 'check-box-demo',
  title: '样例二',
  describe: '',
  components: {
    [CheckBox.name]: CheckBox,
  },
  data() {
    return {
      selected: [],
      options: [
        {value: '1', label: '自己'},
        {value: '2', label: '配偶'},
        {value: '3', label: '父母'},
        {value: '4', label: '子女', disabled: true},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
