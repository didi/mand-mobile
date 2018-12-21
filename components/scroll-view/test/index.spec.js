import {ScrollView} from 'mand-mobile'
import ScrollViewRefresh from 'mand-mobile/components/scroll-view/refresh'
import ScrollViewMore from 'mand-mobile/components/scroll-view/more'
import ScrollViewContent from './scroll-view-content'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('ScrollView', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create scroll-view', () => {
    wrapper = mount(ScrollView, {
      slots: {
        default: ScrollViewContent,
      },
    })
    // const eventStub = sinon.stub(wrapper.vm, '$emit')
    wrapper.vm.scrollTo(0, 50, true)
  })

  it('scroll-view pull refresh', done => {
    wrapper = mount(ScrollView, {
      slots: {
        default: ScrollViewContent,
        refresh: ScrollViewRefresh,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    expect(wrapper.findAll('.scroll-view-refresh').length > 0).toBe(true)

    wrapper.vm.triggerRefresh()
    setTimeout(() => {
      expect(eventStub.calledWith('refreshing')).toBe(true)
      done()
    }, 500)
  })

  it('scroll-view load more', () => {
    wrapper = mount(ScrollView, {
      slots: {
        default: ScrollViewContent,
        more: ScrollViewMore,
      },
    })

    const eventStub = sinon.stub(wrapper.vm, '$emit')
    expect(wrapper.findAll('.scroll-view-more').length > 0).toBe(true)
  })
})
