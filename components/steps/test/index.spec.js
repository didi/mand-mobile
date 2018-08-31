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

  it('change steps current animate', () => {
    wrapper = mount(Steps, {
      propsData: {
        steps: [
          {
            name: '登录',
          },
          {
            name: '开通',
          },
          {
            name: '验证',
          },
          {
            name: '成功',
          },
        ],
        current: 0,
      },
    })

    wrapper.setProps({
      current: 3,
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.cIndex).to.equal(3)
      expect(wrapper.vm.iIndex).to.equal(3)
      done()
    })
  })
})
