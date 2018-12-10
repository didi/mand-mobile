/* eslint comma-dangle: ["error", "always-multiline"] */

// 组件引入
import './_style/global.styl'
import {warn} from './_util'
import Button from './button'
import Icon from './icon'
import Popup from './popup'
import PopupTitleBar from './popup-title-bar'
import ActionBar from './action-bar'
import ActionSheet from './action-sheet'
import DropMenu from './drop-menu'
import Picker from './picker'
import Selector from './selector'
import Swiper from './swiper'
import SwiperItem from './swiper-item'
import Toast from './toast'
import Tip from './tip'
import Tabs from './tabs'
import TabPane from './tab-pane'
import TabBar from './tab-bar'
import Tag from './tag'
import InputItem from './input-item'
import Stepper from './stepper'
import Steps from './steps'
import NoticeBar from './notice-bar'
import ImageReader from './image-reader'
import ImageViewer from './image-viewer'
import NumberKeyboard from './number-keyboard'
import Landscape from './landscape'
import ResultPage from './result-page'
import TabPicker from './tab-picker'
import Dialog from './dialog'
import Field from './field'
import FieldItem from './field-item'
import CellItem from './cell-item'
import Switch from './switch'
import Agree from './agree'
import Radio from './radio'
import RadioList from './radio-list'
import DatePicker from './date-picker'
import Captcha from './captcha'
import Codebox from './codebox'
import Cashier from './cashier'
import Chart from './chart'
import Amount from './amount'
import ActivityIndicator from './activity-indicator'
import Check from './check'
import CheckBox from './check-box'
import CheckGroup from './check-group'
import CheckList from './check-list'
import ScrollView from './scroll-view'
import ScrollViewRefresh from './scroll-view-refresh'
import ScrollViewMore from './scroll-view-more'
import Bill from './bill'
import WaterMark from './water-mark'
import Transition from './transition'
import DetailItem from './detail-item'
import Slider from './slider'
import Progress from './progress'
/* @init<%import ${componentNameUpper} from './${componentName}'%> */

// 全量引入提醒
warn(
  'You are using a whole package of mand-mobile, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  'warn',
)

/* global MAN_VERSION */
const version = /* @echo MAN_VERSION */ MAN_VERSION

// 单个组件暴露
export const components = {
  Button,
  Icon,
  Popup,
  PopupTitleBar,
  ActionBar,
  ActionSheet,
  DropMenu,
  Picker,
  Selector,
  TabBar,
  Swiper,
  SwiperItem,
  Tip,
  Tabs,
  Tag,
  InputItem,
  Stepper,
  Steps,
  NoticeBar,
  ImageReader,
  ImageViewer,
  NumberKeyboard,
  Landscape,
  ResultPage,
  TabPicker,
  Dialog,
  Field,
  FieldItem,
  CellItem,
  Switch,
  Agree,
  Radio,
  RadioList,
  DatePicker,
  Captcha,
  Codebox,
  Cashier,
  Chart,
  Amount,
  ActivityIndicator,
  Check,
  CheckBox,
  CheckGroup,
  CheckList,
  ScrollView,
  ScrollViewRefresh,
  ScrollViewMore,
  Bill,
  WaterMark,
  TabPane,
  Transition,
  DetailItem,
  Slider,
  Progress,
  /* @init<%${componentNameUpper},%> */
}

// 定义插件安装方法
const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }
  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component)
    }
  })

  // 全局服务注入
  Vue.prototype.$toast = components.Toast
  Vue.prototype.$dialog = components.Dialog
  Vue.prototype.$sheet = components.ActionSheet
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 集合组件暴露
export {
  install,
  version,
  Button,
  Icon,
  Popup,
  PopupTitleBar,
  ActionBar,
  ActionSheet,
  DropMenu,
  Picker,
  Selector,
  TabBar,
  Swiper,
  SwiperItem,
  Toast,
  Tip,
  Tabs,
  Tag,
  InputItem,
  Stepper,
  Steps,
  NoticeBar,
  ImageReader,
  ImageViewer,
  NumberKeyboard,
  Landscape,
  ResultPage,
  TabPicker,
  Dialog,
  Field,
  FieldItem,
  CellItem,
  Switch,
  Agree,
  Radio,
  RadioList,
  DatePicker,
  Captcha,
  Codebox,
  Cashier,
  Chart,
  Amount,
  ActivityIndicator,
  Check,
  CheckBox,
  CheckGroup,
  CheckList,
  ScrollView,
  ScrollViewRefresh,
  ScrollViewMore,
  Bill,
  WaterMark,
  TabPane,
  Transition,
  DetailItem,
  Slider,
  Progress,
  /* @init<%${componentNameUpper},%> */
}

export default {
  install,
  version,
}
