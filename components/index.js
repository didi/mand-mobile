/* eslint comma-dangle: ["error", "always-multiline"] */

// Import components core
import './_style/global.styl'
import {transformCamelCase, warn} from './_util'
import {setLocale, t} from './_locale'
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
import RadioGroup from './radio-group'
import RadioBox from './radio-box'
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
import Ruler from './ruler'
import TextareaItem from './textarea-item'
import Skeleton from './skeleton'
/* @init<%import ${componentNameUpper} from './${componentName}'%> */

// Totally importing reminder
warn(
  'You are using a whole package of mand-mobile, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  'warn',
)

/* global MAN_VERSION */
const version = /* @echo MAN_VERSION */ MAN_VERSION

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
  RadioGroup,
  RadioBox,
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
  Ruler,
  TextareaItem,
  Skeleton,
  /* @init<%${componentNameUpper},%> */
}

// Define plugin installation method
const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }

  // Register global components
  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component) // kebab-case
      Vue.component(transformCamelCase(`-${component.name}`), component) // PascalCase
    }
  })

  // Mount to prototype
  Vue.prototype.$toast = Toast
  Vue.prototype.$dialog = Dialog
  Vue.prototype.$actionsheet = ActionSheet
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// xport components
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
  RadioGroup,
  RadioBox,
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
  Ruler,
  TextareaItem,
  Skeleton,
  setLocale,
  t,
  /* @init<%${componentNameUpper},%> */
}

export default {
  install,
  version,
}
