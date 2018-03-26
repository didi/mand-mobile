import Icon from '../index'
import {mount} from 'avoriaz'

describe('Icon', () => {
  let wrapper

  it('create a red icon', () => {
    wrapper = mount(Icon, {
      propsData: {
        name: 'hollow-plus',
        color: 'red',
      },
      attachToDocument: true,
    })
    expect(wrapper.hasStyle('fill', 'red')).to.be.true
  })
})
