import TipContent from '../tip.vue'
import Button from '../../button/index.vue'
import sinon from 'sinon'
import {mount} from 'avoriaz'

describe('Tip', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a tip float over left', () => {
    wrapper = mount(TipContent, {
      propsData: {
        content: 'Hello, Earth!',
        placement: 'left',
      },
    })

    expect(wrapper.hasClass('is-left')).to.be.true
  })

  it('create a tip float over bottom', () => {
    wrapper = mount(TipContent, {
      propsData: {
        content: 'Hello, Earth!',
        placement: 'bottom',
      },
    })

    expect(wrapper.hasClass('is-bottom')).to.be.true
  })

  it('create a tip float over right', () => {
    wrapper = mount(TipContent, {
      propsData: {
        content: 'Hello, Earth!',
        placement: 'right',
      },
    })

    expect(wrapper.hasClass('is-right')).to.be.true
  })

  it('click close to hide', () => {
    wrapper = mount(TipContent, {
      propsData: {
        content: 'Hello, Earth!',
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')

    wrapper.first('.md-icon-cross').trigger('click')
    expect(eventStub.calledWith('close')).to.be.true
  })
})
