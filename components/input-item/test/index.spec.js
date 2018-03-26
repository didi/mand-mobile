import InputItem from '../index'
import triggerEvent from '../../popup/test/touch-trigger'
import {mount} from 'avoriaz'

describe('InputItem', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a input-item', () => {
    wrapper = mount(InputItem, {
      propsData: {
        value: 'test',
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const input = wrapper.find('.md-input-item-input')[0]
    wrapper.vm.inputValue = '123'
    // expect(eventStub.calledWith('change')).to.be.true

    input.trigger('focus')
    expect(eventStub.calledWith('focus')).to.be.true
    input.trigger('blur')
    expect(eventStub.calledWith('blur')).to.be.true

    wrapper.vm.focus()
    triggerEvent(input.element, 'keydown', 0, 0, 49)
    triggerEvent(input.element, 'keyup', 0, 0, 49)

    wrapper.vm.blur()
    expect(wrapper.vm.getValue()).to.equal('123')

    wrapper.setProps({value: '456'})
    expect(wrapper.vm.getValue()).to.equal('456')
  })

  it('input-item keyup/down', () => {
    wrapper = mount(InputItem, {
      propsData: {
        type: 'bankCard',
        value: '123123',
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const input = wrapper.find('.md-input-item-input')[0]

    wrapper.vm.focus()
    triggerEvent(input.element, 'keydown', 0, 0, 49)
    triggerEvent(input.element, 'keyup', 0, 0, 49)

    triggerEvent(input.element, 'keydown', 0, 0, 11)
    triggerEvent(input.element, 'keyup', 0, 0, 11)

    triggerEvent(input.element, 'keydown', 0, 0, 13)
    triggerEvent(input.element, 'keyup', 0, 0, 13)
    expect(eventStub.calledWith('confirm')).to.be.true
    // wrapper.vm.blur()
  })

  it('phone input-item', () => {
    wrapper = mount(InputItem, {
      propsData: {
        type: 'phone',
        value: '123123123123123123',
      },
    })

    expect(wrapper.vm.inputValue.length).to.equal(13)
  })

  it('input-item with clear btn', () => {
    wrapper = mount(InputItem, {
      propsData: {
        value: 'test',
        clearable: true,
      },
    })
    expect(wrapper.vm.isInputEmpty).to.be.false
    const clearBtn = wrapper.find('.md-input-item-clear')[0]
    clearBtn.trigger('click')
    expect(wrapper.vm.isInputEmpty).to.be.true
  })

  it('input-item with number-keyborad', done => {
    wrapper = mount(InputItem, {
      propsData: {
        type: 'money',
        isVirtualKeyboard: true,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    const input = wrapper.find('.md-input-item-fake')[0]

    // input.trigger('click')

    wrapper.vm.focus()
    setTimeout(() => {
      const keyborad = wrapper.find('.md-number-keyboard')[0]
      keyborad.find('.delete')[0].trigger('click')
      keyborad.find('.keyboard-number-item')[1].trigger('click')
      keyborad.find('.keyboard-number-item')[9].trigger('click')
      keyborad.find('.keyboard-number-item')[9].trigger('click')
      keyborad.find('.keyboard-number-item')[2].trigger('click')
      keyborad.find('.keyboard-number-item')[2].trigger('click')
      keyborad.find('.delete')[0].trigger('click')
      expect(wrapper.vm.inputValue).to.equal('2.3')
      keyborad.find('.confirm')[0].trigger('click')
      expect(eventStub.calledWith('confirm')).to.be.true
      wrapper.vm.blur()
      done()
    }, 500)
    // wrapper.vm.blur()
  })

  it('input-item disabled', () => {
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

    const input = wrapper.find('.md-input-item-fake')[0]

    input.trigger('click')
  })
})
