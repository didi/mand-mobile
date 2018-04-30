<template>
  <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-0">
    <md-button @click="showTabPicker">普通多频道</md-button>
    <md-tab-picker
      v-model="isTabPickerShow"
      :title="title"
      :data="pickerData"
      ok-text="确认"
      cancel-text="取消"
      @confirm="onTabPickerConfirm"
      @change="onTabPickerChange"
    ></md-tab-picker>
  </div>
</template>

<script>
import {Button, TabPicker} from 'mand-mobile'
import pickerData from 'mand-mobile/components/tab-picker/demo/data/no-cascade'

export default {
  name: 'tab-picker-demo',
  /* DELETE */
  title: '普通多频道',
  height: 500,
  /* DELETE */
  components: {
    [TabPicker.name]: TabPicker,
    [Button.name]: Button,
  },

  data() {
    return {
      isTabPickerShow: false,
      title: '选择title',
      pickerData,
    }
  },

  methods: {
    showTabPicker() {
      this.isTabPickerShow = true
    },
    onTabPickerConfirm(selected) {
      if (selected) {
        console.log(`[Mand Mobile] TabPicker 确认选择项: ${JSON.stringify(selected)}`)
      } else {
        console.warn('[Mand Mobile] TabPicker 点击确认按钮时未选择到任何确定项')
      }
    },
    onTabPickerChange(select) {
      console.log(
        `[Mand Mobile] TabPicker 第${select.selectTab}列, 第${select.selectIndex}项: label: ${select.selectItem
          .label}, value: ${select.selectItem.value}`,
      )
    },
  },
}

</script>
