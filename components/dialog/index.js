import Vue from 'vue'
import Dialog from './dialog'
const DialogConstructor = Vue.extend(Dialog)

const noop = function() {}

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

  vm.$on('input', val => {
    if (!val) {
      vm.value = false
    }
  })
  vm.$on('hide', () => {
    vm.$destroy()
    document.body.removeChild(vm.$el)
  })

  return vm
}

Dialog.confirm = ({title = '', icon = '', content = '', cancelText = '取消', confirmText = '确定', onConfirm = noop}) => {
  const vm = generate({
    title,
    icon,
    content,
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

Dialog.alert = ({title = '', icon = '', content = '', confirmText = '确定', onConfirm = noop}) => {
  const vm = generate({
    title,
    icon,
    content,
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

Dialog.succeed = props => {
  props.icon = 'circle-right'
  return Dialog.confirm(props)
}

Dialog.failed = props => {
  props.icon = 'circle-cross'
  return Dialog.confirm(props)
}

export default Dialog
