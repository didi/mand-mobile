<template>
  <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-0">
    <md-field title="地址">
      <md-field-item
        :title="addressStr"
        arrow="arrow-right"
        @click="show = !show"
      />
    </md-field>
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      :data="data"
      v-model="show"
      @change="handleChange"
    />
  </div>
</template>

<script>import {Field, FieldItem, TabPicker} from 'mand-mobile'
import data from '../data'

export default {
  name: 'tab-bar-demo',
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
    }
  },
  computed: {
    addressStr() {
      return this.address.map(item => item.label).join(' ') || '请选择联系地址'
    },
  },
  methods: {
    handleChange({options}) {
      this.address = options
    },
  },
}
</script>
