import Vue from 'vue'
import Dialog from './dialog'
const DialogConstructor = Vue.extend(Dialog)

const noop = function() {}

// all active instances
const instances = []

/**
 * Dialog factory
 *
 * @param {Object} props
 * @return {Dialog}
 */
const generate = function({title = '', icon = '', content = '', closable = false, btns = []}) {
  const vm = new DialogConstructor({
    propsData: {
      value: true,
      title,
      icon,
      content,
      closable,
      btns,
    },
  }).$mount()

  instances.push(vm)

  vm.$on('input', val => {
    if (!val) {
      vm.value = false
    }
  })
  vm.$on('hide', () => {
    const index = instances.indexOf(vm)
    if (index >= 0) {
      instances.splice(index, 1)
    }
    vm.$destroy()
  })

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
  content = '',
  cancelText = '取消',
  confirmText = '确定',
  closable = false,
  onConfirm = noop,
}) => {
  const vm = generate({
    title,
    icon,
    content,
    closable,
    btns: [
      {
        text: cancelText,
        handler: () => vm.close(),
      },
      {
        text: confirmText,
        handler: () => {
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
Dialog.alert = ({title = '', icon = '', content = '', confirmText = '确定', closable = false, onConfirm = noop}) => {
  const vm = generate({
    title,
    icon,
    content,
    closable,
    btns: [
      {
        text: confirmText,
        handler: () => {
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
  props.icon = 'circle-right'
  return Dialog.confirm(props)
}

/**
 * Dynamically create a failed dialog
 *
 * @param {Object} props
 * @return {Dialog}
 */
Dialog.failed = props => {
  props.icon = 'circle-cross'
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
    instance.hide()
  })
}

export default Dialog
