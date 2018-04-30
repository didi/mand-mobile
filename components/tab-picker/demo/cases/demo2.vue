<template>
  <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-2">
    <md-button @click="showTabPicker">异步级联多频道</md-button>
    <md-tab-picker
      v-model="isTabPickerShow"
      data-struct="async"
      :title="title"
      :async-func="asyncFunc"
      :option-render="optionRenders"
      ok-text="确认"
      cancel-text="取消"
      @confirm="onTabPickerConfirm"
      @change="onTabPickerChange"
    ></md-tab-picker>
  </div>
</template>

<script>
import {Button, TabPicker} from 'mand-mobile'

const NOOP = () => {}

export default {
  name: 'tab-picker-demo',
  /* DELETE */
  title: '异步级联多频道',
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
      optionRenders: [NOOP, NOOP, this.optionRender],
    }
  },

  methods: {
    asyncFunc: (value, callback) => {
      console.log('loading')
      setTimeout(() => {
        callback(null, {
          options: [
            {
              label: '一级选项一',
              value: '0271',
            },
            {
              label: '一级选项二',
              value: '0272',
            },
          ],
          asyncFunc: (value, callback) => {
            console.log('第一级选择项', value)
            callback(null, {
              options: [
                {
                  label: '二级选项一',
                  value: '0271',
                },
                {
                  label: '二级选项二',
                  value: '0272',
                },
              ],
              asyncFunc: (value, callback) => {
                console.log('第二级选择项', value)
                callback(null, {
                  options: [
                    {
                      label: '三级选项一',
                      value: '0271',
                    },
                    {
                      label: '三级选项二',
                      value: '0272',
                    },
                  ],
                })
              },
            })
          },
        })
      }, 1000)
    },
    optionRender(item) {
      return `<div class="md-field-item-custom-title">${item.label}</div><div class="md-field-item-custom-brief">十年前你说生如夏花般灿烂，十年后你说平凡才是唯一的答案</div>`
    },
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
