import NoticeBar from '../index'
import {mount} from '@vue/test-utils'

describe('NoticeBar - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('mount time is not null', done => {
    wrapper = mount(NoticeBar, {
      propsData: {
        time: 500,
      },
    })
    setTimeout(() => {
      expect(wrapper.vm.isShow).toBe(false)
      done()
    }, 1000)
  })

  it('notice-bar content scrollable', done => {
    wrapper = mount(NoticeBar, {
      slots: {
        default: [],
      },
      propsData: {
        scrollable: true,
      },
    })
    setTimeout(() => {
      expect(wrapper.vm.overflow).toBe(false)
      done()
    }, 1000)
  })

  it('notice-bar method hide', done => {
    wrapper = mount(NoticeBar)
    wrapper.vm.$_hide(500)
    setTimeout(() => {
      expect(wrapper.vm.isShow).toBe(false)
      done()
    }, 1000)
  })

  it('notice-bar method close', () => {
    wrapper = mount(NoticeBar, {
      propsData: {
        mode: 'closable',
      },
    })
    wrapper.vm.$_close()
    expect(wrapper.vm.isShow).toBe(false)
  })
})
