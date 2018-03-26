import Field from '../index'
import {mount} from 'avoriaz'

describe('Field', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple field with title', () => {
    wrapper = mount(Field, {
      propsData: {
        title: 'field title',
      },
    })
    expect(wrapper.hasClass('md-field')).to.be.true
    expect(wrapper.vm.title).to.equal('field title')
  })

  it('create a simple field without title', () => {
    wrapper = mount(Field, {
      propsData: {
        title: '',
      },
    })
    expect(wrapper.find('.md-field-title').length).to.equal(0)
  })
})
