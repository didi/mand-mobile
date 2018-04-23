import Switch from '../index'
import {mount} from 'avoriaz'

describe('Switch', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple switch', () => {
    wrapper = mount(Switch)
    expect(wrapper.hasClass('md-switch')).to.be.true
  })

  it('create a simple active switch', () => {
    wrapper = mount(Switch, {
      propsData: {
        value: true,
      },
    })
    expect(wrapper.hasClass('active')).to.be.true

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.trigger('click')
    expect(eventStub.calledWith('change')).to.be.true
  })

  it('create a simple inactive switch', done => {
    wrapper = mount(Switch, {
      propsData: {
        value: false,
      },
    })
    expect(wrapper.hasClass('active')).to.be.false

    wrapper.vm.value = true
    setTimeout(() => {
      expect(wrapper.hasClass('active')).to.be.true
      done()
    }, 300)
  })

  it('create a disabled switch', () => {
    wrapper = mount(Switch, {
      propsData: {
        disabled: true,
      },
    })
    expect(wrapper.hasClass('disabled')).to.be.true
  })

  it('click disabled switch', () => {
    wrapper = mount(Switch, {
      propsData: {
        disabled: true,
      },
    })

    const spy = sinon.spy(wrapper.vm, '$_onChange')
    wrapper.find('.md-switch')[0].trigger('click')
    expect(spy.called).to.be.true
  })
})
