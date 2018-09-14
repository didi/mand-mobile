import Vue from 'vue'
import App from './App.vue'
import Weapp from '../../platforms/weapp'

import button from '../../components/button'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(Weapp)
Vue.component('mdButton', button)

const app = new Vue(App)
app.$mount()
