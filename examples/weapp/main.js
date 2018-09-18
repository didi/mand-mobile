import Vue from 'vue'
import App from './App.vue'
import Weapp from '../../platforms/weapp'

import Button from '../../components/button'
import ActionBar from '../../components/action-bar'
import Field from '../../components/field'
import FieldItem from '../../components/field/item'
import Switch from '../../components/switch'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(Weapp)
Vue.component('mdButton', Button)
Vue.component('mdActionBar', ActionBar)
Vue.component('mdField', Field)
Vue.component('mdFieldItem', FieldItem)
Vue.component('mdSwitch', Switch)

const app = new Vue(App)
app.$mount()
