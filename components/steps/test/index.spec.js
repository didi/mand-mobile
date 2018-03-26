import Steps from '../index'
import {mount} from 'avoriaz'

describe('Steps', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple steps', () => {
    wrapper = mount(Steps)

    expect(wrapper.hasClass('md-steps')).to.be.true
  })
})
