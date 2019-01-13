import {Codebox} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'
import triggerEvent from '../../popup/test/touch-trigger'

describe('Codebox - Operation', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple codebox', () => {
    wrapper = mount(Codebox)

    expect(wrapper.classes('md-codebox-wrapper')).toBe(true)
  })

  it('create a codebox with input', () => {
    wrapper = mount(Codebox, {
      propsData: {
        maxlength: -1,
      },
    })
    expect(wrapper.contains('.md-codebox-holder')).toBe(true)
  })

  it('create a codebox with custom keyboard', () => {
    wrapper = mount(Codebox, {
      propsData: {
        system: false,
        isView: true,
      },
    })

    expect(wrapper.contains('.md-number-keyboard')).toBe(true)
  })

  it('emit input/submit events', done => {
    wrapper = mount(Codebox, {
      propsData: {
        isView: true,
      },
    })

    const eventSpy = sinon.spy(wrapper.vm, '$emit')
    wrapper.setData({
      code: '123',
    })
    wrapper
      .findAll('.keyboard-number-item')
      .at(0)
      .trigger('click')
    setTimeout(() => {
      expect(eventSpy.calledWith('input')).toBe(true)
      expect(eventSpy.calledWith('submit', '1231')).toBe(true)
      done()
    }, 0)
  })

  it('click codebox to focus with custom keyboard', done => {
    wrapper = mount(Codebox, {
      propsData: {
        maxlength: -1,
      },
    })
    const eventSpy = sinon.spy(wrapper.vm, '$emit')
    wrapper.find('.md-codebox').trigger('click')
    expect(wrapper.vm.focused).toBe(true)
    wrapper
      .findAll('.keyboard-number-item')
      .at(0)
      .trigger('click')
    wrapper.find('.confirm').trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.focused).toBe(false)
      expect(eventSpy.calledWith('submit', '1')).toBe(true)
      wrapper.setProps({disabled: true})
      wrapper.find('.md-codebox').trigger('click')
      expect(wrapper.vm.focused).toBe(false)
      done()
    }, 0)
  })

  it('click codebox to focus with system keyboard', () => {
    let value = ''
    wrapper = mount(Codebox, {
      propsData: {
        value,
        system: true,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    wrapper.find('.md-codebox').trigger('click')
    expect(wrapper.vm.focused).toBe(true)

    const input = wrapper.find('.md-codebox-input')
    triggerEvent(input.element, 'input', 0, 0, '12')
    expect(value).toBe('12')
    triggerEvent(input.element, 'input', 0, 0, '34')
    expect(value).toBe('1234')

    const form = wrapper.find('form')
    triggerEvent(form.element, 'submit')
  })

  it('delete code char after clicking delete button', () => {
    wrapper = mount(Codebox)
    wrapper.setData({code: '1234'})
    wrapper.find('.delete').trigger('click')
    expect(wrapper.vm.code).toEqual('123')
  })

  it('enter code char after clicking number button', done => {
    let value = ''
    wrapper = mount(Codebox, {
      propsData: {
        maxlength: 4,
        isView: true,
        value,
      },
    })
    wrapper.setProps({value: '12'})
    wrapper
      .findAll('.keyboard-number-item')
      .at(0)
      .trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.code).toEqual('121')
      done()
    }, 0)
  })
})
