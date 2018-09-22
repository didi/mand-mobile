import DetailItem from '../index'
import {mount} from 'avoriaz'

describe('DetailItem', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple detail-item with title', () => {
    wrapper = mount(DetailItem, {
      propsData: {
        title: 'Detail title',
      },
    })
    expect(wrapper.hasClass('md-detail-item')).to.be.true
    expect(wrapper.vm.title).to.equal('Detail title')
  })
})
