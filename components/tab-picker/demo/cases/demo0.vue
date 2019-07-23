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
      v-model="show"
      @change="handleChange"
    />
  </div>
</template>

<script>import {Field, FieldItem, TabPicker} from 'mand-mobile'
import data from 'mand-mobile/components/tab-picker/demo/data'

export default {
  name: 'tab-bar-demo',
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
    }
  },
  computed: {
    addressStr() {
      return this.address.map(item => item.label).join(' ')
    },
  },
  methods: {
    handleChange({options}) {
      this.address = options
    },
  },
}
</script>
