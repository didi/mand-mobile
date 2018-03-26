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

  it('create a simple field-item with brief', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
        brief: 'field item brief',
      },
    })

    expect(wrapper.find('.md-field-item-brief').length).to.equal(1)
  })

  it('create a simple field-item with arrow', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
        brief: 'field item brief',
        arrow: 'arrow-right',
      },
    })

    expect(wrapper.hasClass('has-arrow')).to.be.true

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.trigger('click')
    expect(eventStub.calledWith('click')).to.be.true
  })

  it('create a field-item with solid title', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
        brief: 'field item brief',
        arrow: 'arrow-right',
        solid: true,
      },
    })

    expect(wrapper.find('.solid').length).to.equal(1)
  })

  it('create a field-item with customized value align right', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
        brief: 'field item brief',
        customized: true,
        align: 'right',
      },
    })

    expect(wrapper.vm.customized).to.be.true
  })

  it('create a disabled field-item', () => {
    wrapper = mount(FieldItem, {
      propsData: {
        title: 'field item title',
        brief: 'field item brief',
        arrow: 'arrow-right',
        disabled: true,
      },
    })

    expect(wrapper.hasClass('disabled')).to.be.true
  })
})
