import NoticeBar from '../index'
import {mount} from 'avoriaz'

describe('NoticeBar', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a simple notice-bar', () => {
    wrapper = mount(NoticeBar)

    expect(wrapper.hasClass('md-notice-bar')).to.be.true
    expect(wrapper.vm.closable).to.equal(true)
    expect(wrapper.vm.time).to.equal(0)
    expect(wrapper.vm.icon).to.equal('circle-alert')
  })

  it('mount time is not null', done => {
    wrapper = mount(NoticeBar, {
      propsData: {
        time: 500,
      },
    })
    setTimeout(() => {
      expect(wrapper.vm.isShow).to.equal(false)
      done()
    }, 1000)
  })

  it('notice-bar method hide', done => {
    wrapper = mount(NoticeBar)
    wrapper.vm.$_hide(500)
    setTimeout(() => {
      expect(wrapper.vm.isShow).to.equal(false)
      done()
    }, 1000)
  })

  it('notice-bar method close', () => {
    wrapper = mount(NoticeBar)
    wrapper.vm.$_close()
    expect(wrapper.vm.isShow).to.equal(false)
  })
})
