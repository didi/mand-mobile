import Vue from 'vue'
import ActionSheet from './action-sheet'
const ActionSheetCtor = Vue.extend(ActionSheet)

const noop = function() {}

// all active instances
const instances = []

/**
 * Dynamically create a ActionSheet
 *
 * @param {Objects} param
 */
ActionSheet.create = function({
  value = true,
  title = '',
  options = [],
  defaultIndex = -1,
  invalidIndex = -1,
  cancelText = '取消',
  maxHeight = 400,
  onShow = noop,
  onHide = noop,
  onSelected = noop,
}) {
  const vm = new ActionSheetCtor({
    propsData: {
      value,
      title,
      options,
      defaultIndex,
      invalidIndex,
      cancelText,
      maxHeight,
    },
  }).$mount()

  instances.push(vm)

  if (value) {
    document.body.appendChild(vm.$el)
    vm.value = true
  }
  vm.$watch('value', val => {
    if (val) {
      document.body.appendChild(vm.$el)
    }
  })
  vm.$on('input', val => {
    if (val) {
      vm.value = true
    } else {
      vm.value = false
    }
  })
  vm.$on('show', () => {
    if (typeof onShow === 'function') {
      onShow.call(null)
    }
  })
  vm.$on('hide', () => {
    const parent = vm.$el.parentNode
    if (parent) {
      parent.removeChild(vm.$el)
    }
    if (typeof onHide === 'function') {
      onHide.call(null)
    }
  })
  vm.$on('selected', item => {
    if (typeof onSelected === 'function') {
      onSelected.call(null, item)
    }
  })

  vm.$on('hook:beforeDestroy', () => {
    const parent = vm.$el.parentNode
    const index = instances.indexOf(vm)
    if (index) {
      instances.splice(index, 1)
    }
    if (parent) {
      parent.removeChild(vm.$el)
    }
  })

  return vm
}

/**
 * Close all actived global ActionSheets
 *
 * @static
 * @return void
 */
ActionSheet.closeAll = () => {
  instances.forEach(instance => {
    instance.value = false
  })
}

/**
 * Close and destroy all actived global ActionSheets
 */
ActionSheet.destroyAll = () => {
  instances.forEach(instance => {
    instance.value = false
    instance.$on('hide', () => {
      instance.$destroy()
    })
  })
}

export default ActionSheet
