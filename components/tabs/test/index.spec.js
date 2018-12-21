import Vue from 'vue'
import {Tabs, TabPane} from 'mand-mobile'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('Tabs - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test(`Switch tab`, done => {
    Vue.component(TabPane.name, TabPane)
    wrapper = mount(Tabs, {
      slots: {
        default: [
          '<md-tab-pane class="content" name="p0" label="xxx">xxx</md-tab-pane>',
          '<md-tab-pane class="content" name="p1" label="yyy">yyy</md-tab-pane>',
          '<md-tab-pane class="content" name="p2" label="zzz">zzz</md-tab-pane>',
        ],
      },
      sync: false,
    })

    expect(wrapper.vm.currentName).toBe('p0')

    wrapper.vm.$nextTick(() => {
      const eventSpy = sinon.spy(wrapper.vm, '$emit')
      const tab = wrapper.findAll('.md-tab-bar-item').at(1)
      tab.trigger('click')

      expect(eventSpy.calledWith('change')).toBe(true)
      expect(wrapper.vm.currentName).toBe('p1')
      done()
    })
  })
})
