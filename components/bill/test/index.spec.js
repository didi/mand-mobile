import Bill from '../index'
import {mount} from 'avoriaz'

describe('Bill', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple bill', () => {
    wrapper = mount(Bill)

    expect(wrapper.hasClass('md-bill')).to.be.true
  })
})
