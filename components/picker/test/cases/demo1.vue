<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-1">
    <md-picker
      ref="picker"
      :data="pickerData"
      :cols="3"
      :default-index="pickerDefaultIndex"
      :key="tmp"
      is-view
      is-cascade
    ></md-picker>
  </div>
</template>

<script>import {Picker} from 'mand-mobile'
import district from 'mand-mobile/components/picker/demo/data/district'
import {setTimeout} from 'timers'

export default {
  name: 'picker-demo',
  components: {
    [Picker.name]: Picker,
  },
  data() {
    return {
      pickerData: [],
      pickerDefaultIndex: [],
    }
  },
  mounted() {
    this.pickerData = district
    this.pickerDefaultIndex = [3, 2, 1]
    setTimeout(() => {
      this.$refs.picker.refresh()
    }, 0)
  },
}
</script>