import Slider from '../index'
import {mount} from 'avoriaz'

describe('Slider', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple slider', () => {
    wrapper = mount(Slider)

    expect(wrapper.hasClass('md-slider')).to.be.true
  })
})
