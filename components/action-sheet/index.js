import Vue from 'vue'
import ActionSheet from './action-sheet.vue'

const noop = function() {}

// all active instances
const instances = []

/**
 * Dynamically create a ActionSheet
 *
 * @param {Object} param
 * @return {ActionSheet}
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
  onCancel = noop,
}) {
  const ActionSheetCtor = Vue.extend(ActionSheet)
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

  /* istanbul ignore else */
  if (value) {
    document.body.appendChild(vm.$el)
    vm.value = true
  }
  vm.$watch(
    'value',
    /* istanbul ignore next */ val => {
      if (val) {
        document.body.appendChild(vm.$el)
      }
    },
  )
  vm.$on(
    'input',
    /* istanbul ignore next */ val => {
      if (val) {
        vm.value = true
      } else {
        vm.value = false
      }
    },
  )
  vm.$on(
    'show',
    /* istanbul ignore next */ () => {
      if (typeof onShow === 'function') {
        onShow.call(null)
      }
    },
  )
  vm.$on(
    'hide',
    /* istanbul ignore next */ () => {
      const parent = vm.$el.parentNode
      if (parent) {
        parent.removeChild(vm.$el)
      }
      if (typeof onHide === 'function') {
        onHide.call(null)
      }
    },
  )
  vm.$on(
    'selected',
    /* istanbul ignore next */ item => {
      if (typeof onSelected === 'function') {
        onSelected.call(null, item)
      }
    },
  )
  vm.$on(
    'cancel',
    /* istanbul ignore next */ item => {
      if (typeof onCancel === 'function') {
        onCancel.call(null, item)
      }
    },
  )

  /* istanbul ignore next */
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
 *
 * @static
 * @return void
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
