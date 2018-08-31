import TabBar from '../index'
import {mount} from 'avoriaz'

describe('TabBar', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create an empty tab bar', () => {
    wrapper = mount(TabBar)

    expect(wrapper.hasClass('md-tab-bar')).to.be.true
  })

  it('create a simple tab bar', () => {
    wrapper = mount(TabBar, {
      propsData: {
        items: [{name: '1', label: '标题一'}, {name: '2', label: '标题二'}, {name: '3', label: '标题三'}],
      },
    })

    expect(wrapper.find('.md-tab-bar-item').length).to.equal(3)
  })

  it('switch menu by parent', done => {
    wrapper = mount(TabBar, {
      propsData: {
        items: [{name: '1', label: '标题一'}, {name: '2', label: '标题二'}, {name: '3', label: '标题三'}],
      },
    })

    wrapper.setProps({value: '2'})
    setTimeout(() => {
      expect(wrapper.vm.currentName).to.equal('2')
      done()
    }, 0)
  })

  it('switch menu by click', done => {
    wrapper = mount(TabBar, {
      propsData: {
        items: [
          {name: '1', label: '标题一'},
          {name: '2', label: '标题二'},
          {name: '3', label: '标题三'},
          {name: '4', label: '标题四'},
          {name: '5', label: '标题五'},
          {name: '6', label: '标题六'},
        ],
      },
    })

    expect(wrapper.find('.md-tab-bar-item')[0].hasClass('is-active')).to.be.true
    wrapper.find('.md-tab-bar-item')[4].trigger('click')
    setTimeout(() => {
      expect(wrapper.find('.md-tab-bar-item')[4].hasClass('is-active')).to.be.true
      wrapper.find('.md-tab-bar-item')[1].trigger('click')
    }, 100)
    setTimeout(() => {
      expect(wrapper.find('.md-tab-bar-item')[1].hasClass('is-active')).to.be.true
      done()
    }, 200)
  })

  it('click disabled menu', done => {
    wrapper = mount(TabBar, {
      propsData: {
        items: [{name: '1', label: '标题一'}, {name: '2', label: '标题二'}, {name: '3', label: '标题三', disabled: true}],
      },
    })

    expect(wrapper.find('.md-tab-bar-item')[0].hasClass('is-active')).to.be.true
    wrapper.find('.md-tab-bar-item')[2].trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.currentName).to.equal('1')
      done()
    }, 0)
  })
})
