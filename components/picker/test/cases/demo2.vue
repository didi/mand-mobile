<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-2">
    <md-picker
      ref="picker0"
      value
      :data="pickerData0"
      title="选择年份"
    ></md-picker>
  </div>
</template>

<script>import {Picker} from 'mand-mobile'
import simple from 'mand-mobile/components/picker/demo/data/simple'

export default {
  name: 'picker-demo',
  components: {
    [Picker.name]: Picker,
  },
  data() {
    return {
      pickerData0: simple,
    }
  },
}
</script>
