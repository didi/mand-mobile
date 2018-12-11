<template>
  <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-0">
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      :data="data"
      value
    />
  </div>
</template>

<script>import {TabPicker} from 'mand-mobile'
import data from 'mand-mobile/components/tab-picker/demo/data'

export default {
  name: 'tab-bar-demo',
  components: {
    [TabPicker.name]: TabPicker,
  },
  data() {
    return {
      show: false,
      data: data,
    }
  },
}
</script>
