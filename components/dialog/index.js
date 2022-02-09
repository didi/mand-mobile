import Vue from 'vue'
import {t} from '../_locale'
import Dialog from './dialog.vue'

/* istanbul ignore next */
const noop = function() {}

// all active instances
const instances = []

/**
 * Dialog factory
 *
 * @param {Object} props
 * @return {Dialog}
 */
const generate = function({
  title = '',
  icon = '',
  iconSvg = false,
  content = '',
  closable = false,
  transition = 'md-bounce',
  btns = [],
  onShow = noop,
  onHide = noop,
}) {
  const DialogConstructor = Vue.extend(Dialog)
  const vm = new DialogConstructor({
    propsData: {
      value: false,
      title,
      icon,
      iconSvg,
      content,
      closable,
      btns,
      transition,
      preventScroll: true,
    },
  }).$mount()

  instances.push(vm)

  vm.$on('input', val => {
    /* istanbul ignore else */
    if (!val) {
      vm.value = false
    }
  })
  vm.$on('hide', () => {
    const index = instances.indexOf(vm)
    /* istanbul ignore else */
    if (index >= 0) {
      instances.splice(index, 1)
    }
    vm.$destroy()
    onHide()
  })
  vm.$on('show', () => {
    onShow()
  })

  vm.value = true

  return vm
}

/**
 * Dynamically create a confirm dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.confirm = ({
  title = '',
  icon = '',
  iconSvg = false,
  content = '',
  cancelText = t('md.dialog.cancel'),
  cancelWarning = false,
  confirmText = t('md.dialog.confirm'),
  confirmWarning = false,
  closable = false,
  transition,
  onConfirm = noop,
  onCancel = noop,
  onShow = noop,
  onHide = noop,
}) => {
  const vm = generate({
    title,
    icon,
    iconSvg,
    content,
    closable,
    transition,
    onShow,
    onHide,
    btns: [
      {
        text: cancelText,
        warning: cancelWarning,
        handler: /* istanbul ignore next */ () => {
          if (onCancel() !== false) {
            vm.close()
          }
        },
      },
      {
        text: confirmText,
        warning: confirmWarning,
        handler: /* istanbul ignore next */ () => {
          if (onConfirm() !== false) {
            vm.close()
          }
        },
      },
    ],
  })

  return vm
}

/**
 * Dynamically create a alert dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.alert = ({
  title = '',
  icon = '',
  iconSvg = false,
  content = '',
  confirmText = t('md.dialog.confirm'),
  closable = false,
  warning = false,
  transition,
  onConfirm = noop,
  onShow = noop,
  onHide = noop,
}) => {
  const vm = generate({
    title,
    icon,
    iconSvg,
    content,
    closable,
    transition,
    onShow,
    onHide,
    btns: [
      {
        text: confirmText,
        warning,
        handler: /* istanbul ignore next */ () => {
          if (onConfirm() !== false) {
            vm.close()
          }
        },
      },
    ],
  })

  return vm
}

/**
 * Dynamically create a succeed dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.succeed = props => {
  props.icon = 'success-color'
  return Dialog.confirm(props)
}

/**
 * Dynamically create a failed dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.failed = props => {
  props.icon = 'warn-color'
  return Dialog.confirm(props)
}

/**
 * Close all actived static dialogs
 *
 * @static
 * @return void
 */
Dialog.closeAll = () => {
  instances.forEach(instance => {
    instance.close()
  })
}

export default Dialog
