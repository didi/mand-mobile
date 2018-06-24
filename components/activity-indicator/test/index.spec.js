import ActivityIndicator from '../index'
import ActivityIndicatorRollerSuccess from '../roller-success'
import {mount} from 'avoriaz'

describe('ActivityIndicator', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('roller', () => {
    wrapper = mount(ActivityIndicator, {
      propsData: {
        size: 30,
      },
    })

    expect(wrapper.hasClass('roller')).to.be.true
  })

  it('spinner', () => {
    wrapper = mount(ActivityIndicator, {
      propsData: {
        type: 'spinner',
        size: 30,
      },
    })

    expect(wrapper.hasClass('spinner')).to.be.true
  })

  it('carousel', () => {
    wrapper = mount(ActivityIndicator, {
      propsData: {
        type: 'carousel',
        size: 30,
      },
    })

    expect(wrapper.hasClass('carousel')).to.be.true
  })

  it('roller-success', done => {
    wrapper = mount(ActivityIndicatorRollerSuccess, {
      propsData: {
        size: 30,
        isSuccess: false,
      },
    })

    expect(wrapper.hasClass('md-activity-indicator-rolling-success')).to.be.true
    wrapper.vm.isSuccess = true
    wrapper.vm.$nextTick(() => {
      wrapper.vm.isSuccess = false
      done()
    })
  })
})
