import {TabPicker} from 'mand-mobile'
import data from '../demo/data'
import sinon from 'sinon'
import {mount} from '@vue/test-utils'

describe('TabPicker - Operation', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('select and switch pane', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data,
        value: true,
      },
      sync: false,
    })

    expect(wrapper.vm.currentTab).toBe('province')

    const eventSpy = sinon.spy(wrapper.vm, '$emit')
    const item0 = wrapper
      .find({
        name: 'province',
        class: 'md-radio-item',
      })
      .findAll('.md-radio-item')
      .at(0)

    item0.trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.panes.length).toBe(2)
      expect(wrapper.vm.currentTab).toBe('block')

      const item1 = wrapper
        .find({
          name: 'block',
          class: 'md-radio-item',
        })
        .findAll('.md-radio-item')
        .at(0)
      item1.trigger('click')

      setTimeout(() => {
        expect(eventSpy.calledWith('change')).toBe(true)
        done()
      }, 600)
    }, 300)
  })

  it('set default value', () => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: data,
        value: true,
        defaultValue: ['pk'],
      },
      sync: false,
    })
    expect(JSON.stringify(wrapper.vm.selected)).toBe(JSON.stringify(['pk']))
  })

  it('click mask to close', done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data: data,
        value: true,
      },
      sync: false,
    })

    const eventSpy = sinon.spy(wrapper.vm, '$emit')
    wrapper.find('.md-popup-mask').trigger('click')
    setTimeout(() => {
      expect(eventSpy.calledWith('input')).toBe(true)
      done()
    }, 300)
  })
})
