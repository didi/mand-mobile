import Tabs from '../index'
import {mount} from 'avoriaz'

describe('Tabs', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create an empty tabs', () => {
    wrapper = mount(Tabs)

    expect(wrapper.hasClass('md-tabs')).to.be.true
  })

  it('create a simple tabs', () => {
    wrapper = mount(Tabs, {
      propsData: {
        items: [{key: '1', label: '标题一'}, {key: '2', label: '标题二'}, {key: '3', label: '标题三'}],
      },
    })

    expect(wrapper.find('.md-tabs-item').length).to.equal(3)
  })

  it('switch tab by parent', done => {
    wrapper = mount(Tabs, {
      propsData: {
        items: [{key: '1', label: '标题一'}, {key: '2', label: '标题二'}, {key: '3', label: '标题三'}],
      },
    })

    wrapper.setProps({value: '2'})
    setTimeout(() => {
      expect(wrapper.vm.activeKey).to.equal('2')
      done()
    }, 0)
  })

  it('switch tab by click', done => {
    wrapper = mount(Tabs, {
      propsData: {
        items: [
          {key: '1', label: '标题一'},
          {key: '2', label: '标题二'},
          {key: '3', label: '标题三'},
          {key: '4', label: '标题四'},
          {key: '5', label: '标题五'},
          {key: '6', label: '标题六'},
        ],
      },
    })

    expect(wrapper.find('.md-tabs-item')[0].hasClass('is-active')).to.be.true
    wrapper.find('.md-tabs-item')[4].trigger('click')
    setTimeout(() => {
      expect(wrapper.find('.md-tabs-item')[4].hasClass('is-active')).to.be.true
      wrapper.find('.md-tabs-item')[1].trigger('click')
    }, 100)
    setTimeout(() => {
      expect(wrapper.find('.md-tabs-item')[1].hasClass('is-active')).to.be.true
      done()
    }, 200)
  })
})
