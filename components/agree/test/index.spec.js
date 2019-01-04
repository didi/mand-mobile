import {Agree} from 'mand-mobile'
import sinon from 'sinon'
import {shallowMount} from '@vue/test-utils'

describe('Agree - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('change event', () => {
    let checked = false
    wrapper = shallowMount(Agree, {
      propsData: {
        value: checked,
      },
      listeners: {
        input(val) {
          checked = val
        },
      },
    })
    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    wrapper.find('.md-agree-icon').trigger('click')
    expect(eventSpy.calledWith('change')).toBe(true)
    expect(eventSpy.calledWith('input')).toBe(true)
    expect(checked).toBe(true)
  })

  test('disabled', () => {
    let checked = false
    wrapper = shallowMount(Agree, {
      propsData: {
        value: checked,
        disabled: true,
      },
      listeners: {
        input(val) {
          checked = val
        },
      },
    })
    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    wrapper.find('.md-agree-icon').trigger('click')
    expect(eventSpy.calledWith('change')).toBe(false)
    expect(eventSpy.calledWith('input')).toBe(false)
    expect(checked).toBe(false)
  })
})
