import CellItem from '../index'
import {mount} from 'avoriaz'

describe('CellItem', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple cell-item with title', () => {
    wrapper = mount(CellItem, {
      propsData: {
        title: 'Cell title',
      },
    })
    expect(wrapper.hasClass('md-cell-item')).to.be.true
    expect(wrapper.vm.title).to.equal('Cell title')
  })
})
