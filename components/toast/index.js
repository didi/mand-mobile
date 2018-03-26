import Vue from 'vue'
import ToastOptions from './toast'
const ToastConstructor = Vue.extend(ToastOptions)

function Toast({content = '', icon = '', duration = 3000, hasMask = false, parentNode = document.body}) {
  let vm = Toast._instance

  if (!vm) {
    vm = Toast._instance = new ToastConstructor({
      propsData: {
        content,
        icon,
        duration,
        hasMask,
      },
    }).$mount()
    parentNode.appendChild(vm.$el)
  }

  vm.content = content
  vm.icon = icon
  vm.duration = duration
  vm.hasMask = hasMask
  vm.visible = true

  return vm
}

// There is only one toast singleton
Toast._instance = null

/**
 * Hide toast
 */
Toast.hide = () => {
  if (Toast._instance instanceof ToastConstructor && Toast._instance.visible) {
    Toast._instance.hide()
  }
}

/**
 * Show info toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.info = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => {
  return Toast({
    icon: '',
    content,
    duration,
    hasMask,
    parentNode,
  })
}

/**
 * Show succeed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.succeed = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => {
  return Toast({
    icon: 'circle-right',
    content,
    duration,
    hasMask,
    parentNode,
  })
}

/**
 * Show failed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=true]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.failed = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => {
  return Toast({
    icon: 'circle-cross',
    content,
    duration,
    hasMask,
    parentNode,
  })
}

/**
 * Show loading toast
 * @param {string} content
 * @param {number=} [duration=0]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */
Toast.loading = (content = '', duration = 0, hasMask = true, parentNode = document.body) => {
  return Toast({
    icon: 'spinner',
    content,
    duration,
    hasMask,
    parentNode,
  })
}

export default Toast
