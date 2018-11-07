import Overlay from '../index'
import {mount} from 'avoriaz'

describe('Overlay', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple overlay', () => {
    wrapper = mount(Overlay)

    expect(wrapper.hasClass('md-overlay')).to.be.true
  })
})
