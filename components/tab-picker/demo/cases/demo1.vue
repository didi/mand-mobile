<template>
  <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-0">
    <md-field title="地址">
      <md-field-item
        title="联系地址"
        arrow="arrow-right"
        @click="show = !show"
        placeholder="请选择联系地址"
        :content="addressStr"
        solid
      />
    </md-field>
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      large-radius
      :data="data"
      :extras-data="extrasData"
      v-model="show"
      @change="handleChange"
      @select="handleSelect"
    />
  </div>
</template>

<script>import {Field, FieldItem, TabPicker} from 'mand-mobile'
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
  title: '快速选择区',
  titleEnUS: 'Quick block',
  /* DELETE */
  height: 550,
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [TabPicker.name]: TabPicker,
  },
  data() {
    return {
      show: false,
      address: [],
      data: data,
      extrasData: extrasData,
      defaultValue: ['pk'],
    }
  },
  computed: {
    addressStr() {
      return this.address.map(item => item.label).join(' ')
    },
  },
  methods: {
    handleChange(data) {
      console.log('demo1 change event', data)
      const {options} = data
      this.address = options
    },
    handleSelect(item) {
      console.log('demo1 select event', item)
    },
  },
}
</script>
