// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './route'
import App from './App'
import FastClickDefault, {FastClick} from 'fastclick'
import '../components/_style/global.styl'
import './theme.custom.styl'
import mandMobile from '../lib/mand-mobile.umd'
import '../lib/mand-mobile.css'

const _attach = FastClickDefault.attach || FastClick.attach
if ('ontouchstart' in window) {
  _attach(document.body)
}

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(mandMobile)

const isProd = process.env.NODE_ENV === 'production'

const router = new VueRouter({
  mode: 'hash',
  base: isProd ? '/mand-mobile/examples' : '',
  routes,
})

router.afterEach(route => {
  document.title = route.name ? `${route.name}-Mand Mobile` : 'Mand Mobile'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
