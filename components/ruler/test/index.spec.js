import SingleComponent from '../index'
import {mount} from 'avoriaz'

describe('SingleComponent', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple ruler', () => {
    wrapper = mount(SingleComponent)

    expect(wrapper.hasClass('md-ruler')).to.be.true
  })
})
