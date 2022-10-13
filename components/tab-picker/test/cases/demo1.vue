<template>
  <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-0">
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      :data="data"
      :extras-data="extrasData"
      value
    />
  </div>
</template>

<script>import {TabPicker} from 'mand-mobile'
import data from 'mand-mobile/components/tab-picker/demo/data'
const extrasData = {
  subtitle: '热点城市',
  list: [
    {
      value: 'pk',
      label: '北京',
      icon: 'location',
      size: 'sm',
    },
    {
      value: 'cd',
      label: '成都市',
    },
    {
      value: 'jn',
      label: '金牛区',
      icon: 'location',
    },
    {
      value: 'jn2',
      label: '金牛区滴',
      icon: 'location',
    },
    {
      value: 'jn0',
      label: '金牛区滴',
      icon: 'location',
    },
    {
      value: 'jn3',
      label: '金牛滴',
      icon: 'location',
    },
    {
      value: 'jn5',
      label: '金牛滴',
    },
  ],
}
export default {
  name: 'tab-bar-demo',
  components: {
    [TabPicker.name]: TabPicker,
  },
  data() {
    return {
      show: false,
      data: data,
      extrasData: extrasData,
    }
  },
}
</script>
