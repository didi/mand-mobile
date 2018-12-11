<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-0">
    <md-picker
      ref="picker"
      :data="pickerData"
      :invalid-index="[[2, 3, 4]]"
      is-view
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
      pickerData: simple,
    }
  },
}
</script>