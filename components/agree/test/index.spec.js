import Agree from '../index'
import {mount} from 'avoriaz'

describe('Agree', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple agree', () => {
    wrapper = mount(Agree)
    expect(wrapper.hasClass('md-agree')).to.be.true
  })

  it('create a simple checked agree and then uncheck it', () => {
    wrapper = mount(Agree, {
      propsData: {
        value: true,
      },
    })
    expect(wrapper.vm.iconName).to.equal('circle-right')

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.find('.md-agree-icon')[0].trigger('click')
    expect(eventStub.calledWith('change')).to.be.true
  })

  it('create a simple unchecked agree and then check it', () => {
    wrapper = mount(Agree, {
      propsData: {
        value: false,
      },
    })
    expect(wrapper.vm.iconName).to.equal('circle')

    wrapper.vm.value = true
    expect(wrapper.vm.iconName).to.equal('circle-right')
  })

  it('create a disabled agree', () => {
    wrapper = mount(Agree, {
      propsData: {
        disabled: true,
      },
    })
    expect(wrapper.hasClass('disabled')).to.be.true
  })
})
