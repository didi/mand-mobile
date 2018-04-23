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

  it('create inline captcha', () => {
    wrapper = mount(Captcha, {
      propsData: {
        isView: true,
      },
    })

    expect(wrapper.contains('.md-dialog')).to.be.false
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
      expect(eventStub.calledWith('show')).to.be.true
      wrapper.find('.md-dialog-close')[0].trigger('click')
      wrapper.setProps({
        value: false,
      })
    }, 300)
    setTimeout(() => {
      expect(eventStub.calledWith('input', false)).to.be.true
      wrapper.setProps({
        value: true,
      })
      setTimeout(() => {
        expect(eventStub.calledWith('show')).to.be.true
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
      expect(wrapper.vm.errorMsg).to.equal('invalid code')
      expect(wrapper.vm.code).to.equal('')
      wrapper.setData({
        code: '123',
      })
      setTimeout(() => {
        expect(wrapper.vm.errorMsg).to.equal('')
        done()
      }, 0)
    }, 10)
  })

  it('click button and emit send event', () => {
    wrapper = mount(Captcha, {
      propsData: {
        value: true,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.find('.md-captcha-content .md-button')[0].trigger('click')
    wrapper.vm.countdown()
    expect(eventStub.calledWith('send')).to.equal(true)
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
