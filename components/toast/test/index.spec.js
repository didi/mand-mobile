import Toast from 'mand-mobile/components/toast/toast'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Toast - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('should update timer after state changed', done => {
    wrapper = mount(Toast, {
      propsData: {
        icon: 'spinner',
        content: 'Hello, Earth!',
        duration: 1000,
      },
    })
    setTimeout(() => {
      wrapper.setProps({icon: 'circle-right'})
      wrapper.vm.show()
      setTimeout(function() {
        expect(wrapper.vm.visible).toBe(true)
        done()
      }, 500)
    }, 800)
  })

  test('auto hide', done => {
    wrapper = mount(Toast, {
      propsData: {
        icon: 'spinner',
        content: 'Hello, Earth!',
        duration: 1000,
      },
    })

    wrapper.vm.fire()
    setTimeout(() => {
      expect(wrapper.vm.visible).toBe(false)
      done()
    }, 1100)
  })

  test('emit hide event', done => {
    wrapper = mount(Toast, {
      propsData: {
        icon: 'spinner',
        content: 'Hello, Earth!',
        duration: 0,
      },
    })

    wrapper.vm.show()
    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.vm.hide()
    setTimeout(() => {
      expect(eventStub.calledWith('hide')).toBe(true)
      done()
    }, 500)
  })
})
