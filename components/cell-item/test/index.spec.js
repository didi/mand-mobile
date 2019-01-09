import {CellItem} from 'mand-mobile'
import sinon from 'sinon'
import {shallowMount} from '@vue/test-utils'

describe('CellItem - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('click event', () => {
    let clicked = false
    wrapper = shallowMount(CellItem, {
      listeners: {
        click(val) {
          clicked = true
        },
      },
    })
    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    wrapper.find('.md-cell-item').trigger('click')
    expect(eventSpy.calledWith('click')).toBe(true)
    expect(clicked).toBe(true)
  })

  test('disabled item', () => {
    let clicked = false
    wrapper = shallowMount(CellItem, {
      propsData: {
        disabled: true,
      },
      listeners: {
        click(val) {
          clicked = true
        },
      },
    })
    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    wrapper.find('.md-cell-item').trigger('click')
    expect(eventSpy.calledWith('click')).toBe(false)
    expect(clicked).toBe(false)
  })
})
