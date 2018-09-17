import Vue from 'vue'
import App from './App.vue'
import Weapp from '../../platforms/weapp'

import Button from '../../components/button'
import ActionBar from '../../components/action-bar'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(Weapp)
Vue.component('mdButton', Button)
Vue.component('mdActionBar', ActionBar)

const app = new Vue(App)
app.$mount()
