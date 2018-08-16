// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './single-component-app'
import '../components/_style/global.styl'

if ('ontouchstart' in window) {
  FastClick.attach(document.body)
}

Vue.config.productionTip = false

const isProd = process.env.NODE_ENV === 'production'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
})
