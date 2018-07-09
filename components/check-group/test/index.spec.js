import CheckGroup from '../index'
import {mount} from 'avoriaz'

describe('CheckGroup', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple check-group', () => {
    wrapper = mount(CheckGroup)

    expect(true).to.be.true
  })
})
