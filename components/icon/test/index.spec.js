import {Icon} from 'mand-mobile'
import sinon from 'sinon'
import {shallowMount} from '@vue/test-utils'

describe('Icon - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('icon click event', () => {
    let clicked = false
    wrapper = shallowMount(Icon, {
      propsData: {
        name: 'success-color',
      },
      listeners: {
        click() {
          clicked = true
        },
      },
    })
    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    wrapper.find('.md-icon').trigger('click')
    expect(eventSpy.calledWith('click')).toBe(true)
    expect(clicked).toBe(true)
  })
})
