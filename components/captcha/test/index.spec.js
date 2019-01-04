import {Captcha} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Captcha - Operation', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  document.body.removeChild = () => {}

  it('create a simple captcha', () => {
    wrapper = mount(Captcha, {
      propsData: {
        system: true,
        value: true,
      },
      sync: false,
    })

    expect(wrapper.classes('md-captcha')).toBe(true)
  })

  it('create a captcha and not append to body', () => {
    wrapper = mount(Captcha, {
      propsData: {
        appendTo: false,
      },
    })

    expect(wrapper.vm.$el.parentNode).not.toEqual(document.body)
  })

  it('create inline captcha', () => {
    wrapper = mount(Captcha, {
      propsData: {
        isView: true,
      },
    })

    expect(wrapper.contains('.md-dialog')).toBe(false)
  })

  it('should clean code after shown again', () => {
    wrapper = mount(Captcha, {
      propsData: {
        value: false,
      },
      data: {
        code: '123',
      },
    })

    wrapper.setProps({
      value: true,
    })

    expect(wrapper.vm.code).toEqual('')
  })

  it('show and hide captcha', done => {
    wrapper = mount(Captcha, {
      propsData: {
        value: false,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.setProps({
      value: true,
    })
    setTimeout(() => {
      expect(eventStub.calledWith('show')).toBe(true)
      wrapper.find('.md-dialog-close').trigger('click')
      wrapper.setProps({
        value: false,
      })
    }, 300)
    setTimeout(() => {
      expect(eventStub.calledWith('input', false)).toBe(true)
      wrapper.setProps({
        value: true,
      })
      setTimeout(() => {
        expect(eventStub.calledWith('show')).toBe(true)
        done()
      }, 300)
    }, 600)
  })

  it('set and show error message', done => {
    wrapper = mount(Captcha, {
      propsData: {
        value: true,
      },
    })

    wrapper.vm.setError('invalid code')
    setTimeout(() => {
      expect(wrapper.vm.errorMsg).toEqual('invalid code')
      expect(wrapper.vm.code).toEqual('')
      wrapper.setData({
        code: '123',
      })
      setTimeout(() => {
        expect(wrapper.vm.errorMsg).toEqual('')
        done()
      }, 0)
    }, 10)
  })

  it('click button and emit send event', done => {
    wrapper = mount(Captcha, {
      propsData: {
        value: true,
        count: 2,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.find('.md-captcha-btn').trigger('click')
    expect(eventStub.calledWith('send')).toEqual(true)
    setTimeout(() => {
      done()
    }, 2000)
  })

  it('not countdown', () => {
    wrapper = mount(Captcha, {
      propsData: {
        value: true,
        count: 0,
      },
    })

    wrapper.vm.countdown()
    expect(wrapper.findAll('.md-captcha-btn').length).toEqual(0)
  })

  it('emit submit events', done => {
    wrapper = mount(Captcha, {
      propsData: {
        maxlength: 4,
        value: false,
        isView: true,
        appendTo: false,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.setProps({
      value: true,
    })
    setTimeout(() => {
      const keys = wrapper.findAll('.keyboard-number-item')
      keys.at(0).trigger('click')
      keys.at(1).trigger('click')
      keys.at(2).trigger('click')
      keys.at(0).trigger('click')
      setTimeout(() => {
        expect(eventStub.calledWith('submit', '1231')).toBe(true)
        done()
      }, 0)
    }, 500)
  })
})
