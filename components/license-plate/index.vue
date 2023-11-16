<template>
  <div class="md-license-plate">
    <div v-if="modeShow === 'division'">
      <div
        class="md-license-plate-input-container division"
        :id="inputViewId"
      >
        <license-plate-input
          :keyArray="keyArray"
          :selectedIndex="dyCurrentIndex"
          @keyMapping="keyMapping"
        />
      </div>
      <div
        v-if="showDivisionKeyboard"
        class="md-license-plate-keyboard-container division"
        :id="keyboardViewId"
      >
        <license-plate-keyboard
          :keyboard="dyKeyboard"
          @enter="$_onEnter"
          @delete="$_onDelete"
          @confirm="$_onConfirm"
        />
      </div>
    </div>
    <div v-if="modeShow === 'popUp'">
      <md-popup
        :value="showPopUp"
        :hasMask="true"
        position="bottom"
        :maskClosable="false"
      >
        <md-popup-title-bar
          only-close
          large-radius
          :title="title"
          :describe="subtitle"
          title-align="left"
          @cancel="$_onHide"
        ></md-popup-title-bar>
        <div class="md-popup-content">
          <div class="md-license-plate-input-container popUp">
            <license-plate-input
              :keyArray="keyArray"
              :selectedIndex="dyCurrentIndex"
              @keyMapping="keyMapping"
            />
          </div>
          <div class="md-license-plate-keyboard-container popUp">
            <license-plate-keyboard
              :keyboard="dyKeyboard"
              @enter="$_onEnter"
              @delete="$_onDelete"
              @confirm="$_onConfirm"
            />
          </div>
        </div>
      </md-popup>
    </div>
  </div>
</template>

<script>import licensePlateKeyboard from '../license-plate-keyboard'
import licensePlateInput from '../license-plate-input'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import {directiveInit, queryCurParentNode, unique} from './util'

export default {
  name: 'md-license-plate',

  components: {
    licensePlateKeyboard,
    licensePlateInput,
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
  },

  props: {
    // 省份数据
    shortcuts: {
      type: Array,
      default: () => {
        return [
          '京',
          '津',
          '渝',
          '沪',
          '冀',
          '晋',
          '辽',
          '吉',
          '黑',
          '苏',
          '浙',
          '皖',
          '闽',
          '赣',
          '鲁',
          '豫',
          '鄂',
          '湘',
          '粤',
          '琼',
          '川',
          '贵',
          '云',
          '陕',
          '甘',
          '青',
          '蒙',
          '桂',
          '宁',
          '新',
          '藏',
        ]
      },
    },
    // 字母键盘数据
    letterData: {
      type: Array,
      default: () => {
        return [
          {
            value: 'Q',
            disabled: false,
          },
          {
            value: 'W',
            disabled: false,
          },
          {
            value: 'E',
            disabled: false,
          },
          {
            value: 'R',
            disabled: false,
          },
          {
            value: 'T',
            disabled: false,
          },
          {
            value: 'Y',
            disabled: false,
          },
          {
            value: 'U',
            disabled: false,
          },
          {
            value: 'I',
            disabled: true,
          },
          {
            value: 'O',
            disabled: true,
          },
          {
            value: 'P',
            disabled: false,
          },
          {
            value: 'A',
            disabled: false,
          },
          {
            value: 'S',
            disabled: false,
          },
          {
            value: 'D',
            disabled: false,
          },
          {
            value: 'F',
            disabled: false,
          },
          {
            value: 'G',
            disabled: false,
          },
          {
            value: 'H',
            disabled: false,
          },
          {
            value: 'J',
            disabled: false,
          },
          {
            value: 'K',
            disabled: false,
          },
          {
            value: 'L',
            disabled: false,
          },
          {
            value: 'Z',
            disabled: false,
          },
          {
            value: 'X',
            disabled: false,
          },
          {
            value: 'C',
            disabled: false,
          },
          {
            value: 'V',
            disabled: false,
          },
          {
            value: 'B',
            disabled: false,
          },
          {
            value: 'N',
            disabled: false,
          },
          {
            value: 'M',
            disabled: false,
          },
        ]
      },
    },
    // 展示模式
    modeShow: {
      type: String,
      default: 'division',
    },
    // 弹窗模式下控制展示
    showPopUp: {
      type: Boolean,
      default: false,
    },
    // 弹窗模式下展示标题
    title: {
      type: String,
      default: '请输入车牌号码',
    },
    // 弹窗模式下展示副标题
    subtitle: {
      type: String,
      default: '',
    },
    // 默认键位值
    defaultValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      // 数字键盘
      numbers: [
        {
          value: 1,
          disabled: false,
        },
        {
          value: 2,
          disabled: false,
        },
        {
          value: 3,
          disabled: false,
        },
        {
          value: 4,
          disabled: false,
        },
        {
          value: 5,
          disabled: false,
        },
        {
          value: 6,
          disabled: false,
        },
        {
          value: 7,
          disabled: false,
        },
        {
          value: 8,
          disabled: false,
        },
        {
          value: 9,
          disabled: false,
        },
        {
          value: 0,
          disabled: false,
        },
      ],
      // 用户输入的车牌数据
      keyArray: (this.defaultValue && this.defaultValue.split('')) || ['', '', '', '', '', '', '', ''],
      selectedIndex: 0, // 当前用户输入框已选中的序号
      showDivisionKeyboard: false,
      inputViewId: unique() + '_divisionInput',
      keyboardViewId: unique() + '_divisionKeyboard',
    }
  },

  computed: {
    // 计算属性，当前选中输入框的序号
    dyCurrentIndex: function() {
      return this.selectedIndex
    },
    dyKeyboard() {
      let numbers = [],
        shortcuts = [],
        letterData = [],
        keyboardType,
        mixedKeyboard = []

      // 省市键盘数据
      shortcuts = this.shortcuts

      // 省市键盘 (第一位)
      if (this.dyCurrentIndex === 0) {
        keyboardType = 1
      } else {
        keyboardType = 2

        // 拼接功能键
        letterData = JSON.parse(JSON.stringify(this.letterData))
        // 删除键
        letterData.splice(19, 0, {
          type: 'delete',
          imgUrl: require('./assets/close.png'),
          disabled: false,
        })
        // 确定键
        letterData.push({
          type: 'confirm',
          text: '确定',
          disabled: false,
        })

        // 数字键数据
        numbers = this.numbers

        // 数字字母键盘禁用数字 (第二位)
        if (this.selectedIndex === 1) {
          numbers = this.numbers.map(item => {
            return {
              ...item,
              disabled: true,
            }
          })
        }

        mixedKeyboard = numbers.concat(letterData)
      }

      return {
        shortcuts,
        mixedKeyboard,
        keyboardType,
      }
    },
  },

  created() {
    // 初始化自定义指令
    directiveInit()
  },

  methods: {
    keyMapping(index) {
      // 展示键盘
      if (!this.showDivisionKeyboard) {
        this.showDivisionKeyboard = true
        // 抛出展示分离键盘事件
        this.$emit('sdKeyboard')
      }
      // 顺序填写，不可无序点击
      if (!this.keyArray[index + 1] && !this.keyArray[index - 1]) {
        return
      }
      this.selectedIndex = index
    },
    // 半弹层关闭事件
    $_onHide() {
      this.$emit('hide')
    },
    // 键入事件
    $_onEnter(value) {
      // 重置键位值
      this.$set(this.keyArray, this.selectedIndex, value)

      // 点击的是最后一个键位值，掩藏键盘，自动执行确认事件
      if (this.selectedIndex === this.keyArray.length - 1) {
        this.$_onConfirm()
      } else {
        this.selectedIndex = this.selectedIndex + 1
      }
    },
    // 删除事件
    $_onDelete() {
      // 清空当前键位值
      this.$set(this.keyArray, this.selectedIndex, '')

      // 当前键位是第一个键位，隐藏分离键盘
      if (this.selectedIndex <= 0) {
        if (this.modeShow === 'division') {
          this.hideDivisionKeyboard()
        }
      } else {
        this.selectedIndex = this.selectedIndex - 1
      }
    },
    // 键盘确认事件
    $_onConfirm() {
      if (this.modeShow === 'division') {
        this.hideDivisionKeyboard()
      }
      this.$emit('confirm', this.keyArray.join(''))
    },
    // 隐藏分离键盘
    hideDivisionKeyboard(e) {
      let isKeyboard = false
      if (e && e.target) {
        isKeyboard = queryCurParentNode(e.target, [this.keyboardViewId, this.inputViewId])
      }
      if (this.showDivisionKeyboard && !isKeyboard) {
        this.showDivisionKeyboard = false
        // 抛出隐藏分离键盘事件
        this.$emit('hdKeyboard')
      }
    },
  },

  mounted() {
    // 分离键位模式下，添加点击监听事件
    this.modeShow === 'division' && document.addEventListener('click', this.hideDivisionKeyboard)
  },

  beforeDestroy() {
    this.modeShow === 'division' && document.removeEventListener('click', this.hideDivisionKeyboard)
  },
}
</script>


<style lang="stylus">
.md-license-plate {
  .md-license-plate-keyboard-container {
    width: 100%;
    background: #D9E0E7;
    &.division {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
      position: fixed;
      bottom: 0px;
      left: 0px;
      z-index: 99999;
    }
  }
  .md-license-plate-input-container{
    &.popUp{
      background: #fff;
      padding: 20px 40px 40px;
    }
  }
}
</style>
