import {TextareaItem} from 'mand-mobile'
import {mount} from '@vue/test-utils'
import triggerEvent from '../../popup/test/touch-trigger'

describe('TextareaItem - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('error msg', () => {
    wrapper = mount(TextareaItem, {
      propsData: {
        maxLength: 10,
        error: 'hi',
        value: '禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述',
      },
    })
    expect(wrapper.contains('.md-textarea-item-msg'))
  })

  test('test input', () => {
    wrapper = mount(TextareaItem, {
      propsData: {
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        value: '',
      },
    })
    wrapper.setProps({maxHeight: '200'})
    expect(wrapper.vm.maxHeightInner).toBe('200')
    const textarea = wrapper.vm.$refs.textarea
    triggerEvent(textarea, 'focus', 0, 0)
    triggerEvent(textarea, 'focus', 0, 0)
    textarea.style.height = '342px'
    triggerEvent(textarea, 'input', 0, 0, '禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述')
    triggerEvent(textarea, 'keydown', 0, 0, 49)
    triggerEvent(textarea, 'keyup', 0, 0, 49)
    triggerEvent(textarea, 'blur', 0, 0)

    // 测试高度适应
    wrapper.setProps({maxHeight: '-1'})
    wrapper.setProps({value: '123'})
    expect(wrapper.vm.$refs.textarea.style.height).toBe('-1px')
  })

  test('focus and blur', done => {
    wrapper = mount(TextareaItem, {
      propsData: {
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        value: '1',
      },
    })
    expect(wrapper.vm.getValue()).toBe('1')
    wrapper.vm.blur()
    setTimeout(() => {
      done()
    }, 120)
    wrapper.vm.focus()
  })
})
