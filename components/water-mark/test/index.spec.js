import WaterMark from '../index'
import {mount} from 'avoriaz'

describe('WaterMark', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple water-mark', () => {
    wrapper = mount(WaterMark)

    expect(wrapper.hasClass('md-water-mark')).to.be.true
  })
})
