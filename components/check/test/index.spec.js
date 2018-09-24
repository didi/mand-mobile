import Check from '../index'
import {mount} from 'avoriaz'

describe('Check', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple check', () => {
    wrapper = mount(Check)

    expect(wrapper.hasClass('md-check')).to.be.true
  })
})
