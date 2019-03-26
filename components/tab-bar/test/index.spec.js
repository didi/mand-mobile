import {TabBar} from 'mand-mobile'
import {mount} from '@vue/test-utils'

describe('TabBar', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('switch menu by parent', done => {
    wrapper = mount(TabBar, {
      propsData: {
        items: [{name: '1', label: '标题一'}, {name: '2', label: '标题二'}, {name: '3', label: '标题三'}],
      },
      sync: false,
    })

    wrapper.setProps({value: '2'})
    setTimeout(() => {
      expect(wrapper.vm.currentName).toBe('2')
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
      sync: false,
    })

    expect(
      wrapper
        .findAll('.md-tab-bar-item')
        .at(0)
        .classes('is-active'),
    ).toBe(true)
    wrapper
      .findAll('.md-tab-bar-item')
      .at(4)
      .trigger('click')
    setTimeout(() => {
      expect(
        wrapper
          .findAll('.md-tab-bar-item')
          .at(4)
          .classes('is-active'),
      ).toBe(true)
      wrapper
        .findAll('.md-tab-bar-item')
        .at(1)
        .trigger('click')
    }, 100)
    setTimeout(() => {
      expect(
        wrapper
          .findAll('.md-tab-bar-item')
          .at(1)
          .classes('is-active'),
      ).toBe(true)
      done()
    }, 200)
  })

  it('click disabled menu', done => {
    wrapper = mount(TabBar, {
      propsData: {
        items: [{name: '1', label: '标题一'}, {name: '2', label: '标题二'}, {name: '3', label: '标题三', disabled: true}],
      },
      sync: false,
    })

    expect(
      wrapper
        .findAll('.md-tab-bar-item')
        .at(0)
        .classes('is-active'),
    ).toBe(true)
    wrapper
      .findAll('.md-tab-bar-item')
      .at(2)
      .trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.currentName).toBe('1')
      done()
    }, 0)
  })
})
