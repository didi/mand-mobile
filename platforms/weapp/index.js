import transition from './components/transition'
import scrollView from './components/scroll-view'
import dom from './modules/document'

const install = function (Vue) {
  if (!Vue || install.installed) {
    return
  }

  Vue.component('mdTransitionPrivate', transition)
  Vue.component('mdScrollViewPrivate', scrollView)

  Vue.prototype.$document = dom
  Vue.prototype.$element = dom
}

export default {
  install
}