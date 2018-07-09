import SingleComponent from '../index'
import {mount} from 'avoriaz'

describe('SingleComponent', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple checkbox', () => {
    wrapper = mount(SingleComponent)

    expect(wrapper.hasClass('md-checkbox')).to.be.true
  })
})
