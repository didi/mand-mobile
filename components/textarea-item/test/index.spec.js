import {TextareaItem} from 'mand-mobile'
import {mount} from '@vue/test-utils'
import triggerEvent from '../../popup/test/touch-trigger'

describe('TextareaItem - Operation', () => {
  let wrapper

  beforeEach(() => {
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {configurable: true, value: 0})
  })

  afterEach(() => {
    // Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', { configurable: true, value: 0 })
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
    textarea.style.height = '342px'
    triggerEvent(textarea, 'input', 0, 0, '禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述')
    triggerEvent(textarea, 'keydown', 0, 0, 49)
    triggerEvent(textarea, 'keyup', 0, 0, 49)
    triggerEvent(textarea, 'blur', 0, 0)

    expect(textarea.style.height).toBe('342px')
  })

  test('test async data', done => {
    wrapper = mount(TextareaItem, {
      propsData: {
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        value: '',
      },
    })
    wrapper.setProps({maxHeight: '200'})
    const textarea = wrapper.vm.$refs.textarea

    // 测试高度适应
    // scrollHeight 总是0, 很难模拟到srollHeight的计算过程
    // https://github.com/testing-library/react-testing-library/issues/353

    // 模拟本来高度342
    textarea.style.height = '342px'
    // 模拟数据异步更新
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {configurable: true, value: 300})
    wrapper.setProps({value: '123'})
    // 验证最终的高度, 以最大高度为准
    setTimeout(() => {
      expect(textarea.style.height).toBe('200px')
      done()
    }, 100)
  })

  test('test textarea not display', done => {
    wrapper = mount(TextareaItem, {
      propsData: {
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        value: '',
      },
    })

    const textarea = wrapper.vm.$refs.textarea

    // 模拟本来高度342
    textarea.style.height = '342px'
    // 模拟textarea还没有显示, scrollHeight==0
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {configurable: true, value: 0})
    wrapper.setProps({value: '123'})

    setTimeout(() => {
      // 现实中是不会改变高度
      expect(textarea.style.height).toBe('auto')
      done()
    }, 100)
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
    }, 220)
    wrapper.vm.focus()
  })

  test('formation', done => {
    wrapper = mount(TextareaItem, {
      propsData: {
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        formation(name, curValue, curPos) {
          return {
            value: curValue.replace(/\d/g, ''),
            range: curPos,
          }
        },
        value: 'abc',
      },
    })
    const textarea = wrapper.vm.$refs.textarea

    expect(wrapper.vm.getValue()).toBe('abc')
    triggerEvent(textarea, 'input', 0, 0, 'efg1')

    setTimeout(() => {
      expect(wrapper.vm.getValue()).toBe('abcefg')
      done()
    }, 100)
    wrapper.vm.focus()
  })

  test('input with delete icon', () => {
    wrapper = mount(TextareaItem, {
      propsData: {
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        clearable: true,
        value: '1',
      },
    })
    expect(wrapper.contains('.md-textarea-item__clear'))
    const clearBtn = wrapper.find('.md-textarea-item__clear')
    clearBtn.trigger('click')
    expect(wrapper.vm.inputValue).toBe('')
  })

  test('compositionable', () => {
    wrapper = mount(TextareaItem, {
      propsData: {
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        clearable: true,
        value: 'abc',
        compositionable: true,
      },
    })

    const textarea = wrapper.vm.$refs.textarea

    expect(wrapper.vm.getValue()).toBe('abc')
    triggerEvent(textarea, 'compositionstart', 0, 0, '')
    expect(wrapper.vm.getValue()).toBe('abc')
    triggerEvent(textarea, 'compositionend', 0, 0, '结束输入')
    expect(wrapper.vm.getValue()).toBe('abc结束输入')
  })
})
