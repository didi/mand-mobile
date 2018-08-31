import Tabs from '../index'
import {mount} from 'avoriaz'

describe('Tabs', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple tabs', () => {
    wrapper = mount(Tabs)

    expect(wrapper.has('.md-tabs')).to.be.true
  })
})
