import Vue from 'vue'
import App from './App.vue'
import Weapp from '../../platforms/weapp'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(Weapp)

const app = new Vue(App)
app.$mount()
