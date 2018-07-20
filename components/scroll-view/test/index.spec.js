import ScrollView from '../index'
import ScrollViewRefresh from '../refresh'
import ScrollViewMore from '../more'
import ScrollViewContent from './scroll-view-content'
import triggerTouch from '../../popup/test/touch-trigger'
import {mount} from 'avoriaz'

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
    expect(wrapper.find('.scroll-view-refresh').length > 0).to.be.true

    wrapper.vm.triggerRefresh()
    setTimeout(() => {
      expect(eventStub.calledWith('refreshing')).to.be.true
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
    expect(wrapper.find('.scroll-view-more').length > 0).to.be.true
  })
})
