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
      .find('.md-tab-pane')
      .findAll('.md-radio-item')
      .at(0)
    item0.trigger('click')

    setTimeout(() => {
      expect(wrapper.vm.panes.length).toBe(2)
      expect(wrapper.vm.currentTab).toBe('block')
      const item1 = wrapper
        .findAll('.md-tab-pane')
        .at(1)
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

  it('show quick block', async done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data,
        extrasData: {
          subtitle: '热点城市',
          list: [
            {
              value: 'pk',
              label: '北京',
              icon: 'location',
              size: 'sm',
            },
            {
              value: 'cd',
              label: '成都市',
            },
          ],
        },
        value: true,
      },
      sync: false,
    })
    expect(wrapper.contains('.md-tab-picker-content-quick')).toBe(true)

    const eventSpy = sinon.spy(wrapper.vm, '$emit')

    const quickItem0 = wrapper
      .find('.md-tab-picker-content-quick')
      .findAll('.quick-list-item')
      .at(0)

    // 验证选择快速选择区中的第一个元素，并触发 select 事件
    await quickItem0.trigger('click')
    expect(eventSpy.calledWith('select')).toBe(true)

    // 选择快速选择区后，该区域隐藏
    expect(wrapper.contains('.md-tab-picker-content-quick')).toBe(false)

    done()
  })

  // 传递 defaultValue 属性， 隐藏快速选择区
  it('has defaultValue and hide quick block', async done => {
    wrapper = mount(TabPicker, {
      propsData: {
        data,
        defaultValue: ['pk'],
        extrasData: {
          subtitle: '热点城市',
          list: [
            {
              value: 'pk',
              label: '北京',
              icon: 'location',
              size: 'sm',
            },
            {
              value: 'cd',
              label: '成都市',
            },
          ],
        },
        value: true,
      },
      sync: false,
    })
    expect(wrapper.contains('.md-tab-picker-content-quick')).toBe(false)

    done()
  })
})
