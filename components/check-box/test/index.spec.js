import SingleComponent from '../index'
import {mount} from 'avoriaz'

describe('SingleComponent', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple check-box', () => {
    wrapper = mount(SingleComponent)

    expect(wrapper.hasClass('md-check-box')).to.be.true
  })
})
