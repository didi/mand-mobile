import ResultPage from '../index'
import {mount} from 'avoriaz'

describe('ResultPage', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple result-page', () => {
    wrapper = mount(ResultPage)

    expect(wrapper.hasClass('md-result-page')).to.be.true
  })
})
