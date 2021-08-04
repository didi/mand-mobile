<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-2">
    <md-field>
      <md-field-item
        title="起保年份"
        arrow="arrow"
        :addon="pickerValue0"
        @click="isPickerShow0 = true">
      </md-field-item>
      <md-field-item
        title="省市区/县"
        arrow="arrow"
        :addon="pickerValue1"
        @click="isPickerShow1 = true">
      </md-field-item>
    </md-field>
    <md-picker
      ref="picker0"
      v-model="isPickerShow0"
      :data="pickerData0"
      large-radius
      @confirm="onPickerConfirm(0)"
      title="选择年份"
    ></md-picker>
    <md-picker
      ref="picker1"
      v-model="isPickerShow1"
      :data="pickerData1"
      :cols="3"
      is-cascade
      large-radius
      title="选择省市区/县"
      @confirm="onPickerConfirm(1)"
    ></md-picker>
  </div>
</template>

<script>import {Picker, Field, FieldItem} from 'mand-mobile'
import simple from 'mand-mobile/components/picker/demo/data/simple'
import district from 'mand-mobile/components/picker/demo/data/district'

export default {
  name: 'picker-demo',
  /* DELETE */
  title: '弹出展示',
  titleEnUS: 'Display in Popup',
  height: 500,
  /* DELETE */
  components: {
    [Picker.name]: Picker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  data() {
    return {
      isPickerShow0: false,
      isPickerShow1: false,
      pickerData0: simple,
      pickerData1: district,
      pickerValue0: '',
      pickerValue1: '',
    }
  },
  methods: {
    onPickerConfirm(index) {
      const values = this.$refs[`picker${index}`].getColumnValues()

      let res = ''
      values.forEach(value => {
        value && (res += `${value.text || value.label} `)
      })
      this[`pickerValue${index}`] = res
    },
  },
}
</script>
