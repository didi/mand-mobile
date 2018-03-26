import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home'
import Error from '../Error'
import Routes from '../../../public/route'

Vue.use(Router)

Routes.map((item, index) => {
  item.meta = item.meta || {}
  item.meta.index = index
  return item
})

const routes = [
  ...Routes,
  {path: '/home', component: Home, meta: {noMenu: true}},
  {path: '/', redirect: '/home'},
  {path: '*', component: Error, meta: {noMenu: true}},
]

const router = new Router({
  mode: 'history',
  base: window.mbConfig.routePrefix,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.text
    ? `${to.meta.text}-${window.mbConfig.title}`
    : window.mbConfig.title).replace(/<[^>]+>/g, '')
  next()
})

window.$routes = Routes

export default router
