import Captcha from '../index'
import sinon from 'sinon'
import {mount} from 'avoriaz'

describe('Captcha', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple captcha', () => {
    wrapper = mount(Captcha, {
      propsData: {
        system: true,
        value: true,
      },
    })

    expect(wrapper.hasClass('md-captcha')).to.be.true
  })

  it('create a captcha and not append to body', () => {
    wrapper = mount(Captcha, {
      propsData: {
        appendTo: false,
      },
    })

    expect(wrapper.vm.$el.parentNode).not.to.equal(document.body)
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

    expect(wrapper.vm.code).to.equal('')
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
    wrapper.setData({
      code: '123',
    })
    setTimeout(() => {
      wrapper.first('.keyboard-number-item').trigger('click')
      setTimeout(() => {
        expect(eventStub.calledWith('submit', '1231')).to.be.true
        done()
      }, 0)
    }, 500)
  })
})
