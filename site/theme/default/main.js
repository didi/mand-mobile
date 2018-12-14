// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import VueTooltip from 'v-tooltip'
import { setScale } from './assets/js/util'

if (process.env.NODE_ENV === 'production') {
  const hostname = location.hostname
  const pathname = location.pathname
  if (hostname === 'didi.github.io') {
    __webpack_public_path__ = '/mand-mobile/'
  } else if (hostname === 'mand-mobile.gitee.io') {
    if (~pathname.indexOf('/1x-doc')) {
      __webpack_public_path__ = '/1x-doc/'
    } else if (~pathname.indexOf('/2x-doc')) {
      __webpack_public_path__ = '/2x-doc/'
    } else {
      __webpack_public_path__ = '/docs/'
    }
  }
}

Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(VueTooltip)

if ($(window).width() > 750) {
  setScale(0.5)
}

window.jumpAnchor = (anchor) => {
  if (!anchor || !document.getElementById(decodeURIComponent(anchor))) {
    return
  }
  window.document.getElementById(decodeURIComponent(anchor)).scrollIntoView()
  let hash = window.location.hash.replace(/\?.*/, '')
  window.location.hash = `${hash}?anchor=${anchor}`
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
