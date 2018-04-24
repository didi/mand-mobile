<template>
  <div class="md-example tab-picker">
    <section class="md-example-section">
      <div class="md-example-title">基本</div>
      <div class="md-example-content">
        <md-button @click="$_showTabPicker(1)">普通多频道</md-button>
        <md-tab-picker
          v-model="isTabPickerShow[1]"
          :title="title"
          :data="normalData"
          ok-text="确认"
          cancel-text="取消"
          @confirm="$_confirm"
          @cancel="$_cancel"
          @change="$_change"
          @show="$_show"
          @hide="$_hide"
        >
          <div
            slot="titles"
            slot-scope="props"
            class="title-item">
            标签dom
            {{ props.label }}
          </div>
          <li
            slot="option"
            slot-scope="props"
            class="option-item">
            公共dom样式
            <div v-if="props.index === 0" >
              第{{ props.index }}列dom样式 {{ props.option.label }}
            </div>
            <div v-else-if="props.index === 1">
              第{{ props.index }}列dom样式  {{ props.option.label }}
            </div>
            <div v-else>
              第{{ props.index }}列dom样式 {{ props.option.label }}
            </div>
          </li>
        </md-tab-picker>

        <md-button @click="$_showTabPicker(0)">级联多频道</md-button>
        <md-tab-picker
          v-model="isTabPickerShow[0]"
          :title="title"
          :data="cascadeData"
          ok-text="确认"
          cancel-text="取消"
          data-struct= "cascade"
          :option-render="[()=>{}, ()=>{}, $_optionRender]"
          @confirm="$_confirm"
          @cancel="$_cancel"
          @change="$_change"
          @show="$_show"
          @hide="$_hide"
        ></md-tab-picker>

        <md-button @click="$_showTabPicker(2)">异步级联多频道</md-button>
        <md-tab-picker
          v-model="isTabPickerShow[2]"
          :title="title"
          :async-func="asyncFunc"
          ok-text="确认"
          cancel-text="取消"
          data-struct= "async"
          :option-render="[()=>{}, ()=>{}, $_optionRender]"
          @confirm="$_confirm"
          @cancel="$_cancel"
          @change="$_change"
          @show="$_show"
          @hide="$_hide"
        >
          <span slot="error">数据异常</span>
          <span class="loading" slot="loading">loading</span>
        </md-tab-picker>
      </div>
    </section>
	</div>
</template>

<script>/*  import from source code */
import Button from '../../button'
import TabPicker from '../index'
import cascadeData from './data/cascade'
import normalData from './data/no-cascade'

export default {
  name: 'tab-picker-demo',
  components: {
    [TabPicker.name]: TabPicker,
    [Button.name]: Button,
  },

  data() {
    return {
      isTabPickerShow: [false, false, false],
      title: '选择title',
      normalData: [],
      cascadeData: [],
      asyncFunc: (value, callback) => {
        console.log('用户自己加loading')
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
              setTimeout(() => {
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
                    setTimeout(() => {
                      // 数据异常传入error
                      // callback({errorCode: 1}, null)
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
                    }, 1000)
                  },
                })
              }, 1000)
            },
          })
        }, 2000)
      },
    }
  },

  mounted() {
    setTimeout(() => {
      this.cascadeData = cascadeData
    }, 1000)
    setTimeout(() => {
      this.normalData = normalData
    }, 200)
  },

  methods: {
    $_showTabPicker(index) {
      this.$set(this.isTabPickerShow, index, true)
    },
    $_confirm(selected) {
      if (selected) {
        console.log(`确认选择项: ${JSON.stringify(selected)}`)
      } else {
        console.warn('点击确认按钮时未选择到任何确定项')
      }
    },
    $_cancel() {},
    $_change(select) {
      console.log(
        `第${select.selectTab}列, 第${select.selectIndex}项: label: ${select.selectItem.label}, value: ${select.selectItem
          .value}`,
      )
    },
    $_show() {},
    $_hide() {},
    $_optionRender(item) {
      return `<div class="md-field-item-custom-title">${item.label}</div><div class="md-field-item-custom-brief">十年前你说生如夏花般灿烂，十年后你说平凡才是唯一的答案</div>`
    },
  },
}
</script>

<style lang="stylus">
.md-example.tab-picker .md-button
  margin-bottom 20px
</style>
