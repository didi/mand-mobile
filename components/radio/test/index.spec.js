import Vue from 'vue'
import {Radio, RadioBox, RadioGroup, RadioList} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'
import triggerTouch from '../../popup/test/touch-trigger'

describe('Radio', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a radio', () => {
    let name = ''
    wrapper = mount(Radio, {
      propsData: {
        name: '123',
      },
      listeners: {
        input(val) {
          name = val
        },
      },
    })
    wrapper.find('.md-radio').trigger('click')
    expect(name).toEqual('123')
  })

  it('create a radio list', done => {
    let value = 0
    wrapper = mount(RadioList, {
      propsData: {
        value,
        options: [{value: 0, text: '选项1'}, {value: 1, text: '选项2', disabled: true}, {value: 2, text: '选项3'}],
        defaultIndex: 1,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    expect(wrapper.findAll('.md-radio-item').length).toEqual(3)
    wrapper
      .findAll('.md-radio-item')
      .at(1)
      .trigger('click')
    expect(
      wrapper
        .findAll('.md-radio-item')
        .at(0)
        .classes('is-selected'),
    ).toBe(true)
    wrapper
      .findAll('.md-radio-item')
      .at(2)
      .trigger('click')
    expect(value).toEqual(2)
    wrapper.vm.select(1)
    expect(value).toEqual(1)
    wrapper.vm.selectByIndex(2)
    expect(value).toEqual(2)

    wrapper.setProps({value: 1})

    wrapper.vm.options = [{text: '选项1'}, {text: '选项2'}]
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.md-radio-item').length).toEqual(2)
      done()
    })
  })

  it('radio group', () => {
    Vue.component(Radio.name, Radio)
    let value = 'a'
    wrapper = mount(RadioGroup, {
      propsData: {
        value,
      },
      slots: {
        default: ['<md-radio name="a"/>', '<md-radio name="b"/>'],
      },
      listeners: {
        input(val) {
          value = val
          wrapper.setProps({value})
        },
      },
    })

    const radios = wrapper.findAll('.md-radio')
    expect(radios.at(0).classes('is-checked')).toBe(true)

    radios.at(1).trigger('click')
    expect(value).toEqual('b')
    radios.at(0).trigger('click')
    expect(value).toEqual('a')
  })

  it('radiokbox click event', () => {
    let value = false
    wrapper = mount(RadioBox, {
      propsData: {
        value,
        name: 'a',
      },
      listeners: {
        input(val) {
          value = val
          wrapper.setProps({value})
        },
      },
    })

    const eventSpy = sinon.spy(wrapper.vm, '$emit')
    const radioBox = wrapper.find('.md-radio-box')

    radioBox.trigger('click')
    expect(eventSpy.calledWith('input')).toBe(true)
    expect(value).toBe('a')
  })

  it('radiobox group', () => {
    Vue.component(RadioBox.name, RadioBox)
    let value = 'a'
    wrapper = mount(RadioGroup, {
      propsData: {
        value,
      },
      slots: {
        default: ['<md-radio-box name="a"/>', '<md-radio-box name="b"/>'],
      },
      listeners: {
        input(val) {
          value = val
          wrapper.setProps({value})
        },
      },
    })

    const radios = wrapper.findAll('.md-radio-box')
    expect(radios.at(0).classes('is-checked')).toBe(true)

    radios.at(1).trigger('click')
    expect(value).toEqual('b')
    radios.at(0).trigger('click')
    expect(value).toEqual('a')
  })

  it('create a radio list with input', () => {
    let value = 0
    wrapper = mount(RadioList, {
      propsData: {
        value,
        options: [{value: 0, text: '选项1'}, {value: 1, text: '选项2'}, {value: 2, text: '选项3'}],
        hasInput: true,
      },
      listeners: {
        input(val) {
          value = val
        },
      },
    })

    const input = wrapper.find('.md-input-item-input')
    input.trigger('focus')
    triggerTouch(input.element, 'input', 0, 0, '123')
    expect(value).toEqual('123')
  })
})
