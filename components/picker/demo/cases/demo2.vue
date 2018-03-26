<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-2">
    <md-field>
      <md-field-item
        name="name"
        title="起保年份"
        arrow="arrow-right"
        align="right"
        :value="pickerValue"
        @click.native="isPickerShow = true">
      </md-field-item>
    </md-field>
    <md-picker
      ref="picker"
      v-model="isPickerShow"
      :data="pickerData"
      @confirm="onPickerConfirm"
      title="选择年份"
    ></md-picker>
  </div>
</template>

<script>import {Picker, Field, FieldItem} from 'mand-mobile'
import simple from 'mand-mobile/components/picker/demo/data/simple'

export default {
  name: 'picker-demo',
  title: '弹出展示',
  height: 350,
  components: {
    [Picker.name]: Picker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  data() {
    return {
      isPickerShow: false,
      pickerData: simple,
      pickerValue: '',
    }
  },
  methods: {
    onPickerConfirm() {
      const values = this.$refs['picker'].getColumnValues()

      let res = ''
      values.forEach(value => {
        value && (res += `${value.text} `)
      })
      this.pickerValue = res
    },
  },
}
</script>