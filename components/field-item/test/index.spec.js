import FieldItem from '../index'
import {mount} from 'avoriaz'

describe('FieldItem', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple field-item', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
      },
    })

    expect(wrapper.hasClass('md-field-item')).to.be.true
    expect(wrapper.vm.title).to.equal('field item title')
  })

  it('create a simple field-item with describe', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
        describe: 'field item describe',
      },
    })

    expect(wrapper.find('.md-field-item-describe').length).to.equal(1)
  })

  it('create a simple field-item with arrow', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
        describe: 'field item describe',
        arrow: true,
      },
    })

    expect(wrapper.contains('.md-icon-arrow-right')).to.be.true

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.trigger('click')
    expect(eventStub.calledWith('click')).to.be.true
  })

  it('create a disabled field-item', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
        describe: 'field item describe',
        arrow: true,
        disabled: true,
      },
    })

    expect(wrapper.hasClass('is-disabled')).to.be.true
  })
})
