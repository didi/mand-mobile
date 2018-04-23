import ActionBar from '../index'
import sinon from 'sinon'
import {mount} from 'avoriaz'

describe('ActionBar', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a action-bar', () => {
    const spy = sinon.spy()
    wrapper = mount(ActionBar, {
      propsData: {
        actions: [
          {
            text: '1',
            onClick: spy,
          },
          {
            text: '2',
          },
        ],
      },
    })
    const buttons = wrapper.find('.button-item')
    const button = wrapper.find('.button-item')[0]
    const eventStub = sinon.stub(wrapper.vm, '$emit')
    button.trigger('click')
    expect(buttons.length).to.equal(2)
    expect(eventStub.calledOnce).to.be.true
    expect(eventStub.calledWith('click')).to.be.true
    expect(spy.called).to.be.true
  })

  it('create a action-bar with disabled button', () => {
    wrapper = mount(ActionBar, {
      propsData: {
        actions: [
          {
            text: '1',
            disabled: true,
          },
          {
            text: '2',
          },
        ],
      },
    })
    const button0 = wrapper.find('.button-item')[0]
    expect(button0.hasClass('disabled')).to.equal(true)
  })

  it('create a action-bar with text', () => {
    wrapper = mount(ActionBar, {
      propsData: {
        actions: [
          {
            text: '1',
          },
        ],
        hasText: true,
      },
    })
    const text = wrapper.find('.md-action-bar-text')
    expect(text.length > 0).to.equal(true)
  })

  it('click disabled action bar', () => {
    wrapper = mount(ActionBar, {
      propsData: {
        actions: [
          {
            text: '1',
            disabled: true,
          },
        ],
        hasText: true,
      },
    })
    const spy = sinon.spy(wrapper.vm, '$_onBtnClick')
    wrapper.first('.button-item').trigger('click')
    expect(spy.called).to.be.true
  })
})
