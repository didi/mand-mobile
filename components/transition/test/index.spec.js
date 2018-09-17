import Transition from '../index'
import {mount} from 'avoriaz'

describe('Transition', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple transition', () => {
    wrapper = mount(Transition)

    expect(wrapper.hasClass('md-transition')).to.be.true
  })
})
