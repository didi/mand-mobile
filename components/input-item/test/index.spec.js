import {InputItem} from 'mand-mobile'
import triggerEvent from '../../popup/test/touch-trigger'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('InputItem - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('input-item keyup/down/input', () => {
    wrapper = mount(InputItem, {
      propsData: {
        type: 'bankCard',
        value: '123123',
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const input = wrapper.find('.md-input-item-input')

    wrapper.vm.focus()
    triggerEvent(input.element, 'keydown', 0, 0, 49)
    triggerEvent(input.element, 'keyup', 0, 0, 49)
    expect(wrapper.vm.isInputEditing).toBe(true)

    triggerEvent(input.element, 'keydown', 0, 0, 11)
    triggerEvent(input.element, 'keyup', 0, 0, 11)

    triggerEvent(input.element, 'keydown', 0, 0, 13)
    triggerEvent(input.element, 'keyup', 0, 0, 13)
    triggerEvent(input.element, 'input', 0, 0, '123')
    expect(eventStub.calledWith('confirm')).toBe(true)
    expect(wrapper.vm.getValue()).toEqual('4949 1111 1313 123')
    wrapper.vm.blur()
  })

  test('input-item preview-type', () => {
    wrapper = mount(InputItem, {
      propsData: {
        type: 'bankCard',
        previewType: 'text',
        value: '123',
      },
    })
    expect(wrapper.vm.inputItemType).toBe('text')
    expect(wrapper.vm.isInputFormative).toBe(false)
    expect(wrapper.vm.inputType).toBe('text')

    const input = wrapper.find('.md-input-item-input')
    wrapper.vm.focus()
    triggerEvent(input.element, 'keydown', 0, 0, 13)
    triggerEvent(input.element, 'keyup', 0, 0, 13)
    expect(wrapper.vm.getValue()).toEqual('123')
    triggerEvent(input.element, 'keydown', 0, 0, 8)
    triggerEvent(input.element, 'keyup', 0, 0, 8)
    expect(wrapper.vm.getValue()).toEqual('')
    expect(wrapper.vm.inputItemType).toBe('bankCard')
    expect(wrapper.vm.isInputFormative).toBe(true)
  })

  test('phone input-item', () => {
    wrapper = mount(InputItem, {
      propsData: {
        type: 'phone',
        value: '123123123123123123',
      },
    })

    expect(wrapper.vm.inputValue.length).toBe(13)
    wrapper.setProps({value: '123'})
    expect(wrapper.vm.inputValue).toEqual('123')
  })

  test('input-item with clear btn', () => {
    wrapper = mount(InputItem, {
      propsData: {
        value: 'test',
        clearable: true,
      },
    })
    expect(wrapper.vm.isInputEmpty).toBe(false)
    const clearBtn = wrapper.find('.md-input-item-clear')
    clearBtn.trigger('click')
    expect(wrapper.vm.isInputEmpty).toBe(true)
  })

  test('input-item formation', () => {
    wrapper = mount(InputItem, {
      propsData: {
        isFormative: true,
        formation(name, curValue, curPos) {
          return {
            value: curValue + 'xxx',
            range: curPos + 3,
          }
        },
      },
    })
    wrapper.setProps({value: '123'})
    expect(wrapper.vm.inputValue).toEqual('123xxx')
  })

  test('input-item with number-keyborad', done => {
    wrapper = mount(InputItem, {
      propsData: {
        type: 'money',
        isVirtualKeyboard: true,
        maxlength: 4,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.vm.focus()
    setTimeout(() => {
      const keyborad = wrapper.find('.md-number-keyboard')
      const deleteBtn = keyborad.find('.delete')
      const confirmBtn = keyborad.find('.confirm')
      const keys = keyborad.findAll('.keyboard-number-item')

      deleteBtn.trigger('click')
      keys.at(1).trigger('click')
      keys.at(9).trigger('click')
      keys.at(9).trigger('click')
      keys.at(2).trigger('click')
      keys.at(2).trigger('click')
      deleteBtn.trigger('click')
      expect(wrapper.vm.isInputEditing).toBe(true)
      expect(wrapper.vm.inputValue).toBe('2.3')
      keys.at(2).trigger('click')
      keys.at(2).trigger('click')
      keys.at(2).trigger('click')
      keys.at(2).trigger('click')
      expect(wrapper.vm.inputValue).toBe('2.33')
      confirmBtn.trigger('click')
      expect(eventStub.calledWith('confirm')).toBe(true)
      wrapper.vm.blur()
      setTimeout(() => {
        expect(wrapper.vm.isInputEditing).toBe(false)
        done()
      }, 500)
    }, 500)
  })

  test('input-item disabled', () => {
    wrapper = mount(InputItem, {
      propsData: {
        disabled: true,
        isVirtualKeyboard: true,
        value: '123',
        formation(name, curValue, curPos) {
          return {
            value: curValue,
            range: curPos,
          }
        },
      },
    })

    const input = wrapper.find('.md-input-item-fake')

    input.trigger('click')
  })

  test('should show error slot', async () => {
    wrapper = mount({
      template: `
        <md-input-item
          type="bankCard"
          title="label">
          <p
            v-if="isError"
            class="error"
            slot="error">
            errorMsg
          </p>
        </md-input-item>
      `,
      components: {
        [InputItem.name]: InputItem,
      },
      data() {
        return {
          isError: false,
        }
      },
    })

    expect(wrapper.contains('.md-input-item-msg')).toBe(false)
    wrapper.vm.isError = true
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.contains('.md-input-item-msg')).toBe(true)
      expect(wrapper.find('.md-input-item-msg').text()).toBe('errorMsg')
    })

    wrapper.vm.isError = false
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.contains('.md-input-item-msg')).toBe(false)
    })
  })
})
