import Codebox from '../index'
import sinon from 'sinon'
import {mount} from 'avoriaz'

describe('Codebox', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple codebox', () => {
    wrapper = mount(Codebox)

    expect(wrapper.hasClass('md-codebox-wrapper')).to.be.true
  })

  it('create a codebox with input', () => {
    wrapper = mount(Codebox, {
      propsData: {
        maxlength: -1,
      },
    })
    expect(wrapper.contains('.md-codebox-holder')).to.be.true
  })

  it('create a codebox with custom keyboard', () => {
    wrapper = mount(Codebox, {
      propsData: {
        system: false,
        isView: true,
      },
    })

    expect(wrapper.contains('.md-number-keyboard')).to.be.true
  })

  it('emit input/submit events', done => {
    wrapper = mount(Codebox, {
      propsData: {
        isView: true,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.setData({
      code: '123',
    })
    wrapper.first('.keyboard-number-item').trigger('click')
    setTimeout(() => {
      expect(eventStub.calledWith('input')).to.be.true
      expect(eventStub.calledWith('submit', '1231')).to.be.true
      done()
    }, 0)
  })

  it('click codebox to focus with custom keyboard', done => {
    wrapper = mount(Codebox, {
      propsData: {
        maxlength: -1,
      },
    })
    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.first('.md-codebox').trigger('click')
    expect(wrapper.vm.focused).to.be.true
    wrapper.first('.keyboard-number-item').trigger('click')
    wrapper.first('.confirm').trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.focused).to.be.false
      expect(eventStub.calledWith('submit', '1')).to.be.true
      done()
    }, 0)
  })

  it('click codebox to focus with system keyboard', () => {
    wrapper = mount(Codebox, {
      propsData: {
        system: true,
      },
    })

    wrapper.first('.md-codebox').trigger('click')
    expect(wrapper.vm.focused).to.be.true
  })

  it('delete code char after clicking delete button', () => {
    wrapper = mount(Codebox, {
      data: {
        code: '1234',
      },
    })

    wrapper.first('.delete').trigger('click')
    expect(wrapper.vm.code).to.equal('123')
  })

  it('enter code char after clicking number button', done => {
    wrapper = mount(Codebox, {
      propsData: {
        maxlength: 4,
        isView: true,
      },
      data: {
        code: '12',
      },
    })

    wrapper.first('.keyboard-number-item').trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.code).to.equal('121')
      done()
    }, 0)
  })
})
